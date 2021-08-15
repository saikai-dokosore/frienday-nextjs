import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";

const database = {
  schedule: [
    { month: "April", emoji: "0x1F338", percentage: 60 },
    { month: "May", emoji: "0x1F38F", percentage: 50 },
    { month: "June", emoji: "0x1F40C", percentage: 70 },
    { month: "July", emoji: "0x1F38B", percentage: 40 },
  ],
  place: [
    {
      name: "ラーメン",
      emoji: "0x1F35C",
    },
    {
      name: "居酒屋",
      emoji: "0x1F376",
    },
  ],
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
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
        <title>test</title>
        <meta name="description" content={"test" + "を気軽に誘っちゃおう"} />
        <link rel="icon" href="/favicon.ico" />
        {/* ここでOGPも設定したい */}
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <Link href="/login">
          <a>login</a>
        </Link>
      </header>
      <div className={styles.accountBox}>
        <div className={styles.accountImgBox}>
          {String.fromCodePoint(0x1f978)}
        </div>
        <div className={styles.accountTextBox}>
          <h3>テストです</h3>
          <p className={styles.accountTextJob}>ニート</p>
          <p className={styles.accountTextBio}>
            初めまして、開発者のさいかいです。現在帰省中なのでバンバン遊びましょう！
          </p>
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
