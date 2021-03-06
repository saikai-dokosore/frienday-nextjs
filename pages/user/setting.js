import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/User.module.scss";
import headerStyles from "../../styles/Header.module.scss";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Index() {
  // Auth
  const { myInfo, setMyInfo, placeCards, setPlaceCards, login, logout } =
    useAuth();
  const router = useRouter();

  const handleLoginButton = async () => {
    await login();
  };
  const handleLogoutButton = () => {
    logout();
  };

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
          <img src={`/images/avatars/${myInfo?.icon}.svg`} alt="" />
        </div>
        <h2>設定</h2>
      </div>

      <div className={styles.contentBox}>
        <div
          className={styles.itemBox}
          onClick={() => {
            alert("まだこの機能はありません");
          }}
        >
          使い方
        </div>
        <div
          className={styles.itemBox}
          onClick={() => {
            handleLogoutButton();
            router.push("/signup/welcome");
          }}
        >
          ログアウト
        </div>
        <div
          className={styles.itemBox}
          onClick={() => {
            alert("まだこの機能はありません");
          }}
        >
          アカウント削除
        </div>
        <div
          className={styles.itemBox}
          onClick={() => {
            alert("まだこの機能はありません");
          }}
        >
          アプリダウンロード
        </div>
      </div>
    </div>
  );
}
