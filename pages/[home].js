import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const database = {
    id: "saikai",
    name: "さいかい",
    job: "学生",
    emoji: "0x1F978",
    color: "green100",
    phone: "08097234800",
    password: "pass001",
    bio: "初めまして、開発者のさいかいです。現在帰省中なのでバンバン遊びましょう！",
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
      {
        name: "ラーメン",
        emoji: "0x1F35C",
      },
      {
        name: "ラーメン",
        emoji: "0x1F35C",
      },
      {
        name: "ラーメン",
        emoji: "0x1F35C",
      },
      {
        name: "ラーメン",
        emoji: "0x1F35C",
      },
      {
        name: "ラーメン",
        emoji: "0x1F35C",
      },
    ],
  };
  return {
    props: {
      database,
    },
  };
}

export default function Home({ database }) {
  const router = useRouter();

  // スケジュールコンポーネント
  const MonthSetBoxs = () => {
    const list = database.schedule?.map((m, i) => {
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
        <meta
          name="description"
          content={router.query.home + "を気軽に誘っちゃおう"}
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
        <div className={styles.accountImgBox + " " + styles[database?.color]}>
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
            <h3>あいてる率</h3>
            <button>編集</button>
          </div>
          <MonthSetBoxs />
        </div>
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
