import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [database, setDatabase] = useState({
    id: "",
    name: "",
    job: "",
    emoji: "",
    phone: "",
    password: "",
    bio: "",
    schedule: [{ month: "", emoji: "", percentage: 0 }],
    place: [
      {
        name: "",
        emoji: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);

  // axios で取得するjsonファイルのパスを宣言
  const URL = "/database.json";

  useEffect(() => {
    axios.get(URL).then((res) => {
      for (let account in res.data) {
        if (res.data[account].id === router.query.home) {
          setDatabase(res.data[account]);
          setIsLoading(false);
        } else {
          console.log("違う");
        }
      }
    });
  }, [router]);

  // スケジュールコンポーネント
  const MonthSetBoxs = () => {
    const list = database.schedule?.map((m, i) => {
      return (
        <li key={i} className={styles.monthSetBox}>
          <div className={styles.month}>{m?.month}</div>
          <div className={styles.percentage}>
            {m?.percentage}
            <span>%</span>
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
    const list = database.place?.map((p, i) => {
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
        <title>{router.query.home}</title>
        <meta name="description" content="超気軽に誘っちゃおう" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>FRIENDAY</header>
      <div className={styles.accountBox}>
        <div className={styles.accountImgBox}>
          {String.fromCodePoint(database?.emoji)}
        </div>
        <div className={styles.accountTextBox}>
          <h3>{database?.name}</h3>
          <p className={styles.accountTextJob}>{database?.job}</p>
          <p className={styles.accountTextBio}>{database?.bio}</p>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.scheduleBox}>
          <div className={styles.BoxHeader}>
            <h3>あいてるひ</h3>
            <button>編集</button>
          </div>
          {isLoading ? <div></div> : <MonthSetBoxs />}
        </div>
        <div className={styles.placeBox}>
          <div className={styles.BoxHeader}>
            <h3>いきたい場所リスト</h3>
            <button>編集</button>
          </div>
          {isLoading ? <div></div> : <PlaceSetBoxs />}
        </div>
      </main>
    </div>
  );
}
