import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import firebase, { db } from "../lib/firebaseInit";

// データ取得用の関数
const getData = async (users) => {
  let userId = ""; // ユーザードキュメントID
  let userObj = {}; // プロフィールオブジェクト
  let placeObj = { place: [] }; // 場所オブジェクト
  const getUserData = async (u) => {
    await u.forEach(async (user) => {
      userId = user.id;
      userObj = user.data();
    });
  };
  const getPlaceData = async (p) => {
    p.forEach(async (place) => {
      placeObj.place.push(place.data());
    });
  };

  await getUserData(users);
  const places = await db
    .collection("users")
    .doc(userId)
    .collection("place")
    .get();
  await getPlaceData(places);

  return { ...userObj, ...placeObj };
};

// サーバー上でレンダリング
export async function getServerSideProps(context) {
  const id = await context.params.home;
  const users = await db.collection("users").where("id", "==", id).get();
  if (users.size === 0) {
    context.res.writeHead(302, { Location: "/404" });
    context.res.end();
  }
  const database = await getData(users);
  return {
    props: {
      id: id,
      database: database || "undef",
    },
  };
}

// コンポーネント
export default function Home({ id, database }) {
  console.log(id + "で検索をかけました");

  const [userData, setUserData] = useState(database); // ユーザープロフィール
  const [placeData, setPlaceData] = useState(database.place); // 行きたい場所

  // スケジュールコンポーネント
  const MonthSetBoxs = () => {
    const list = userData.schedule?.map((m, i) => {
      return (
        <li key={i} className={styles.monthSetBox + " " + styles[m?.month]}>
          <div className={styles.month}>{m?.month}</div>
          <div className={styles.percentage}>
            {m?.percentage}
            <span className={styles.percentageUnit}>%</span>
          </div>
          <div className={styles.emojiBox}>
            <div className={styles.emoji}>{String.fromCodePoint(m?.emoji)}</div>
          </div>
        </li>
      );
    });
    return <ul className={styles.monthRowBox}>{list}</ul>;
  };

  // いきたいところコンポーネント
  const PlaceSetBoxs = () => {
    const list = placeData.map((p, i) => {
      return (
        <li key={i} className={styles.placeSetBox}>
          <div className={styles.placeTextBox}>
            <div className={styles.emoji}>{String.fromCodePoint(p?.emoji)}</div>
            <div className={styles.name}>{p?.name}</div>
          </div>
          <button>いきたい！</button>
        </li>
      );
    });
    return <ul className={styles.placeCulumnBox}>{list}</ul>;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{userData.id}</title>
        <meta
          name="description"
          content={userData.id + "を気軽に誘っちゃおう"}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <Link href="/login">
          <a>login</a>
        </Link>
      </header>
      <div className={styles.accountBox}>
        <div className={styles.accountImgBox + " " + styles[userData?.color]}>
          {String.fromCodePoint(userData?.emoji)}
        </div>
        <div className={styles.accountTextBox}>
          <h3>{userData?.name}</h3>
          <p className={styles.accountTextJob}>{userData?.job}</p>
          <p className={styles.accountTextBio}>{userData?.bio}</p>
        </div>
      </div>
      <main className={styles.main}>
        {/* <div className={styles.scheduleBox}>
          <div className={styles.BoxHeader}>
            <h3>あいてる率</h3>
            <button>編集</button>
          </div>
          <MonthSetBoxs />
        </div> */}
        <div className={styles.placeBox}>
          <div className={styles.BoxHeader}>
            <h3>いきたい場所リスト</h3>
            <button>編集</button>
          </div>
          <PlaceSetBoxs />
        </div>
      </main>
    </div>
  );
}
