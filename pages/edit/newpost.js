import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/EditNewpost.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";

// コンポーネント
export default function Index() {
  const router = useRouter();
  const { myInfo, setMyInfo, myPlaces, setMyPlaces } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>アカウント編集</title>
        <meta name="description" content="アカウント編集画面" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header back={true} />

      <div className={styles.newPostBox}>
        <p className={styles.newpost}>\ NEW POST /</p>
        <div className={styles.placeCard}>
          <div className={styles.image}>
            <Image
              src={`/images/avatars/${router.query.icon}.svg`}
              alt="場所カード"
              width="160"
              height="160"
            />
          </div>
          <div className={styles.hashtag}>
            <p>#{router.query.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
