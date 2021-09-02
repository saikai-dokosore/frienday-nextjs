import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { db, storage } from "../lib/firebaseInit";
import { useAuth } from "../lib/auth";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";
import { waitForAllSettled } from "recoil";

// データ取得用の関数
const getData = async (user) => {
  let id = ""; // ユーザードキュメントID
  let userObj = {}; // プロフィールオブジェクト
  const getUserData = async (u) => {
    await u.forEach(async (us) => {
      id = us?.id;
      userObj = us.data();
    });
  };
  await getUserData(user);
  const userIdObj = { id: id };
  return { ...userIdObj, ...userObj };
};

export const getStaticPaths = async () => {
  const users = await db.collection("users").get(); // 全ユーザー取得
  let items = [];
  users.forEach(function (doc) {
    items.push(doc);
  });
  // useridのパスを生成
  const paths = items.map((item) => ({
    params: {
      home: item.data().userid,
    },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const user = await db
    .collection("users")
    .where("userid", "==", params.home)
    .get();
  const database = await getData(user);
  return {
    props: {
      id: params.home,
      database: database || "undef",
    },
    revalidate: 5,
  };
};

// コンポーネント
export default function Home({ id, database }) {
  const [userData, setUserData] = useState(database); // ユーザープロフィール
  const [placeData, setPlaceData] = useState(); // 行きたい場所
  const [pomu, setPomu] = useState(false);
  const [accountImgUrl, setAccountImgUrl] = useState("");
  const storageRef = storage.ref();
  const [placeUls, setPlaceUls] = useState(<div></div>);
  const { currentUser, login, logout } = useAuth();
  const [isMine, setIsMine] = useState(false);
  const monthEmoji = {
    Jan: "0x1F338",
    Feb: "0x1F338",
    Mar: "0x1F338",
    Apr: "0x1F338",
    May: "0x1F338",
    Jun: "0x1F40C",
    Jul: "0x1F338",
    Aug: "0x1F338",
    Sep: "0x1F338",
    Oct: "0x1F338",
    Nov: "0x1F338",
    Dec: "0x1F338",
  };

  // マイページ判定
  useEffect(() => {
    setIsMine(currentUser?.email === userData?.email ? true : false);
  }, [currentUser]);

  // ProfileImg
  useEffect(() => {
    (async () => {
      const profileImg = await storageRef
        .child(`images/${id}.jpg`)
        .getDownloadURL();
      setAccountImgUrl(profileImg);
    })();
  }, [database]);

  // Place
  useEffect(() => {
    let placeObj = {};
    (async () => {
      // DBから取得
      const places = await db
        .collection("users")
        .doc(userData.id)
        .collection("place")
        .get();
      // 予定がある月をキーとして予定を配列に入れる
      places.forEach(async (p) => {
        if (!placeObj[p.data().month]) {
          placeObj[p.data().month] = [];
        }
        placeObj[p.data().month].push({
          ...{ id: p.id },
          ...p.data(),
        });
      });
      setPlaceData(placeObj);
      // 各月ごとにコンポーネントの配列にする
      let ulComps = [];
      for (let i = 0; i < Object.keys(placeObj).length; i++) {
        let key = Object.keys(placeObj)[i];
        let comp = placeObj[key].map((p, i) => {
          return (
            <li key={i} className={styles.placeListBox}>
              <div className={styles.emoji}>
                {String.fromCodePoint(p?.emoji)}
              </div>
              <div className={styles.placeTextBox}>
                <div className={styles.name}>{p?.name}</div>
              </div>
              <div className={styles.placeBtnBox}>
                <button
                  className={styles.placeGo}
                  onClick={() => goPlace(p?.id)}
                >
                  いきたい！
                </button>
              </div>
            </li>
          );
        });
        ulComps.push(
          <ul key={i} className={styles.placeUlBox + " " + styles[key]}>
            <h3>{String.fromCodePoint(monthEmoji[key]) + " " + key}</h3>
            {comp}
          </ul>
        );
      }
      setPlaceUls(ulComps);
    })();
  }, [database]);

  // いきたい場所を追加
  const addPlace = async () => {
    const place = document.getElementById("addPlaceText").value;
    const placeObj = {
      name: place,
      emoji: "0x1F37B",
    };
    if (place !== "") {
      await db
        .collection("users")
        .doc(userData?.userId)
        .collection("place")
        .add(placeObj);
      setPlaceData([...placeData, placeObj]);
    }
    document.getElementById("addPlaceText").value = "";
  };

  // いきたい場所を削除
  const deletePlace = async (id) => {
    await db
      .collection("users")
      .doc(userData?.userId)
      .collection("place")
      .doc(id)
      .delete();
    setPlaceData(
      placeData.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const goPlace = async (id) => {
    console.log("go : " + id);
    document.getElementById("modal").style.display = "flex";
  };
  const closeModal = () => {
    modal.style.display = "none";
  };
  if (typeof window !== "undefined") {
    window.onclick = function (event) {
      if (event.target == document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
      }
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{userData?.userid}</title>
        <meta
          name="description"
          content={userData?.userid + "を気軽に誘っちゃおう"}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ヘッダー */}
      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        {currentUser ? (
          <div className={styles.headerBtnBox}>
            <Link href="/nortification">
              <a>
                <div className={styles.nortification}>
                  <HiOutlineBell />
                </div>
              </a>
            </Link>
            <Link href="/setting">
              <a>
                <div className={styles.user}>
                  <HiOutlineCog />
                </div>
              </a>
            </Link>
            <Link
              href={currentUser ? `/${userData?.userid}` : "/signup/welcome"}
            >
              <a>
                <div className={styles.user}>
                  <HiOutlineUserCircle />
                </div>
              </a>
            </Link>
          </div>
        ) : (
          <Link href="/signup/welcome">
            <a>マイページを作成する</a>
          </Link>
        )}
      </header>

      {/* アカウント */}
      <div className={styles.accountBox}>
        <div className={styles.accountImgBox + " " + styles.green100}>
          {accountImgUrl === "" ? (
            <div></div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={accountImgUrl} alt="Profile Picture" />
          )}
        </div>
        <div className={styles.accountTextBox}>
          <h3>{userData?.name}</h3>
          <p className={styles.accountTextJob}>{userData?.job}</p>
          <p className={styles.accountTextBio}>{userData?.bio}</p>
        </div>
      </div>

      {/* ポム */}
      {/* <div className={styles.pomuBox}>
        <button
          onClick={() => {
            setPomu(!pomu);
          }}
          className={styles.enable}
        >
          {pomu ? "ポムっています" : "遊びに行けるよー"}
        </button>
      </div> */}

      {/* いきたい場所リスト */}
      <main className={styles.main}>
        <div className={styles.placeBox}>{placeUls}</div>
      </main>

      {/* メッセージモーダル */}
      <div id="modal" className={styles.modalBack}>
        <div className={styles.modal}>
          <h3>メッセージを送ろう</h3>
          <form>
            <textarea placeholder="〇〇グループで行こう！"></textarea>
            <button type="submit">送る</button>
          </form>
        </div>
      </div>
    </div>
  );
}
