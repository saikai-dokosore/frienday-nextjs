import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/User.module.scss";
import headerStyles from "../../styles/Header.module.scss";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

export default function Index() {
  const { myInfo, setMyInfo, placeCards, setPlaceCards, login, logout } =
    useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>設定</title>
        <meta name="description" content="設定" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header back={true} />

      <div className={styles.top}>
        <div className={styles.image + " " + styles[myInfo?.color]}>
          <img src={`/images/avatars/${myInfo?.icon}}.svg`} alt="" />
        </div>
        <h2>Good一覧</h2>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.itemBox}>使い方</div>
        <div className={styles.itemBox}>ログアウト</div>
        <div className={styles.itemBox}>アカウント削除</div>
        <div className={styles.itemBox}>アプリダウンロード</div>
      </div>
    </div>
  );
}
