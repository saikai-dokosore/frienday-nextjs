import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/PlaceDetails.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";

export default function Index() {
  const router = useRouter();
  const { myInfo } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>管理者ページ</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header back={true} />

      <div className={styles.placePage}>
        <div className={styles.placeCard}>
          <div className={styles.image}>
            <Image
              src={`/images/avatars/01.svg`}
              alt="場所カード"
              width={200}
              height={200}
              quality={100}
            />
          </div>
          <div className={styles.hashtag}>
            <p>#表参道カフェ</p>
          </div>
        </div>
        <div className={styles.hashtags}>
          <Image
            src={`/images/hashtagImage.png`}
            alt="ハッシュタグ画像"
            width={342}
            height={342}
            quality={100}
          />
        </div>
        <p className={styles.isGood}>{myInfo?.name}はあなたをGoodしています!</p>
        <div className={styles.sendBox}>
          <input type="text" placeholder="一緒に行こう！" />
          <button onClick={() => {}}>送信</button>
        </div>
      </div>
    </div>
  );
}
