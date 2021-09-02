import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { db, storage } from "../../lib/firebaseInit";
import { useAuth } from "../../lib/auth";
import { HiOutlineUserCircle, HiOutlineBell } from "react-icons/hi";

// データ取得用の関数
const getData = async (user) => {
  let userId = ""; // ユーザードキュメントID
  let userObj = {}; // プロフィールオブジェクト
  let placeObj = {
    place: {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [],
      Oct: [],
      Nov: [],
      Dec: [],
    },
  }; // 場所オブジェクト

  const getUserData = async (u) => {
    await u.forEach(async (us) => {
      userId = us?.id;
      userObj = us.data();
    });
  };
  const getPlaceData = async (p) => {
    p.forEach(async (place) => {
      placeObj.place[place.data().month].push({
        ...{ id: place?.id },
        ...place.data(),
      });
    });
  };

  await getUserData(user);
  const places = await db
    .collection("users")
    .doc(userId)
    .collection("place")
    .get();
  await getPlaceData(places);
  const userIdObj = { userId: userId };

  return { ...userIdObj, ...userObj, ...placeObj };
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
      userid: item.data().userid,
    },
  }));
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const user = await db
    .collection("users")
    .where("userid", "==", params.userid)
    .get();
  const database = await getData(user);
  return {
    props: {
      id: params.userid,
      database: database || "undef",
    },
  };
};

// コンポーネント
export default function Home({ id, database }) {
  console.log(id, database);
  const [userData, setUserData] = useState(database); // ユーザープロフィール
  const [placeData, setPlaceData] = useState(database?.place); // 行きたい場所
  const [pomu, setPomu] = useState(false);
  const [accountImgUrl, setAccountImgUrl] = useState("");
  const storageRef = storage.ref();
  const [loggedIn, setLoggedIn] = useState(false);
  const monthes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
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

  // Auth
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [currentUser]);

  // ProfileImg
  useEffect(() => {
    const getProfileImg = async () => {
      const profileImg = await storageRef
        .child(`images/${id}.jpg`)
        .getDownloadURL();
      setAccountImgUrl(profileImg);
    };
    getProfileImg();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{userData?.id}</title>
        <meta
          name="description"
          content={userData?.id + "を気軽に誘っちゃおう"}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ヘッダー */}
      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        {loggedIn ? (
          <div className={styles.headerBtnBox}>
            <div className={styles.nortification}>
              <HiOutlineBell />
            </div>
            <Link href="/getInsta">
              <a>
                <div className={styles.user}>
                  <HiOutlineUserCircle />
                </div>
              </a>
            </Link>
          </div>
        ) : (
          <Link href="/welcome">
            <a>マイページを作成する</a>
          </Link>
        )}
      </header>
    </div>
  );
}
