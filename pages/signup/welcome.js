import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/SignupWelcome.module.scss";
import headerStyles from "../../styles/Header.module.scss";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Index() {
  const getCodeUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTA_CLIENT_ID}&redirect_uri=https%3A%2F%2Ffrienday.vercel.app%2Fsignup%2Fgetinsta&scope=user_profile,user_media&response_type=code`;

  const { myInfo, setMyInfo, login, logout } = useAuth();
  const router = useRouter();

  const handleLoginButton = async () => {
    await login();
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
      <Header back={false} />

      <div className={styles.top}>
        <div className={styles.image + " " + styles.blue}>
          <img src={`/images/avatars/01.svg`} alt="" />
        </div>
        <h2>Instago</h2>
      </div>

      <div className={styles.contentBox}>
        <div className={styles.text}>
          お気に入りのハッシュタグを置いておく
          <br />
          それだけで誘われるかも、、
          <br />
          そんなサービスです。
        </div>
        <div className={styles.btnBox}>
          <Link href={"/signup/setinsta"}>
            <a className={styles.enable}>アカウント作成</a>
          </Link>
          <button
            onClick={() => {
              handleLoginButton();
            }}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}
