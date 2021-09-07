import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../lib/firebaseInit";
import { useAuth } from "../lib/auth";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

export const getStaticPaths = async () => {
  const users = await db.collection("users").get(); // 全ユーザー取得
  let items = [];
  users.forEach(function (doc) {
    items.push(doc);
  });
  // useridのパスを生成
  const paths = items.map((item) => ({
    params: {
      viewUserId: item.id,
    },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const user = await db.collection("users").doc(params.viewUserId).get();

  // 作成されていないPathなら404へリダイレクト
  if (!user.data()) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {
      id: params.viewUserId,
      database: user.data(),
    },
    revalidate: 5, // 5秒間はキャッシュを更新しない
  };
};

// コンポーネント
export default function Index({ id, database }) {
  const [userData, setUserData] = useState(database); // ユーザープロフィール
  const [placeData, setPlaceData] = useState(); // 行きたい場所
  const [pomu, setPomu] = useState([]);
  const [isFollowYou, setIsFollowYou] = useState(false);
  const [followersNum, setFollowersNum] = useState(0);
  const [followNow, setFollowNow] = useState(true);
  const storageRef = storage.ref();
  const [placeUls, setPlaceUls] = useState(<div></div>);
  const { currentUser, userId, login, logout, getUserId } = useAuth();
  const [isMine, setIsMine] = useState(false);
  const [message, setMessage] = useState("");
  const [acctionBtnId, setAcctionBtnId] = useState("");
  const router = useRouter();
  const {
    name,
    job,
    bio,
    accountImgUrl,
    setName,
    setJob,
    setBio,
    setAccountInfo,
    setAccountImgUrl,
  } = useAuth();

  useEffect(() => {
    setName(database?.name);
    setJob(database?.job);
    setBio(database?.bio);
  }, []);

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
    setIsMine(userId === id ? true : false);
  }, [userId]);

  // Place
  useEffect(() => {
    let placeObj = {};
    (async () => {
      // DBから取得
      const places = await db
        .collection("users")
        .doc(id)
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

  // FollowersNomを取得
  useEffect(() => {
    (async () => {
      // DBから取得
      const followers = await db
        .collection("users")
        .doc(id)
        .collection("followers")
        .get();
      let num = 0;
      followers.forEach(async (p) => {
        if (p?.data()?.now) {
          num = num + 1;
        }
      });
      setFollowersNum(num);
    })();
  }, [userId]);

  // isFollowYouを取得
  useEffect(() => {
    (async () => {
      if (userId) {
        // DBから取得
        const followYou = await db
          .collection("users")
          .doc(id)
          .collection("follows")
          .doc(userId)
          .get();
        if (followYou?.data()?.now) {
          setIsFollowYou(true);
        } else {
          setIsFollowYou(false);
        }
      }
    })();
  }, [userId]);

  // followNowを取得
  useEffect(() => {
    (async () => {
      if (userId) {
        // DBから取得
        const follow = await db
          .collection("users")
          .doc(userId)
          .collection("follows")
          .doc(id)
          .get();
        if (follow?.data()?.now) {
          setFollowNow(true);
        } else {
          setFollowNow(false);
        }
      }
    })();
  }, [userId]);

  // ポムを押したときの挙動
  const acctionfollowNow = async () => {
    const now = !followNow;
    setFollowersNum(now ? followersNum + 1 : followersNum - 1);
    setFollowNow(now);
    await db.collection("users").doc(userId).collection("follows").doc(id).set({
      now: now,
    });
    await db
      .collection("users")
      .doc(id)
      .collection("followers")
      .doc(userId)
      .set({ now: now });
  };

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
    setAcctionBtnId(id);
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
  const sendMessage = async () => {
    const m = {
      content: message,
      read: false,
      sentby: "saikai_official",
      senttime: new Date(),
    };
    closeModal();
    if (acctionBtnId !== "") {
      await db
        .collection("users")
        .doc("saikai_official")
        .collection("place")
        .doc(acctionBtnId)
        .collection("messages")
        .add(m);
    }
  };

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
            <Link href="/user/nortification">
              <a>
                <div className={styles.nortification}>
                  <HiOutlineBell />
                </div>
              </a>
            </Link>
            <Link href="/user/setting">
              <a>
                <div className={styles.user}>
                  <HiOutlineCog />
                </div>
              </a>
            </Link>
            <Link href={currentUser ? `/${userId}` : "/signup/welcome"}>
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
          <h3>{name}</h3>
          <p className={styles.accountTextJob}>
            {job} <span>{followersNum}人にポムられています</span>
          </p>
          {isFollowYou ? (
            <p className={styles.accountTextJob}>あなたをポムっています</p>
          ) : (
            <div></div>
          )}
          <p className={styles.accountTextBio}>{bio}</p>
        </div>
        {isMine ? (
          <div className={styles.editBtn}>
            <button
              onClick={() => {
                router.push("/edit/account");
              }}
            >
              編集
            </button>
          </div>
        ) : (
          <div className={styles.pomuBtn}>
            <button
              onClick={() => {
                acctionfollowNow();
              }}
              className={followNow ? styles.enable : styles.disable}
            >
              {String.fromCodePoint("0x270C")}
            </button>
          </div>
        )}
      </div>

      {/* いきたい場所リスト */}
      <main className={styles.main}>
        <div className={styles.placeBox}>
          {isMine ? (
            <div className={styles.editBtn}>
              <button
                onClick={() => {
                  router.push("/edit/place");
                }}
              >
                編集
              </button>
            </div>
          ) : (
            <div></div>
          )}
          {placeUls}
        </div>
      </main>

      {/* メッセージモーダル */}
      <div id="modal" className={styles.modalBack}>
        <div className={styles.modal}>
          <h3>メッセージを送ろう</h3>
          <div className={styles.form}>
            <textarea
              name="sendtext"
              placeholder="〇〇グループで行こう！"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            ></textarea>
            <button onClick={sendMessage}>送る</button>
          </div>
        </div>
      </div>
    </div>
  );
}
