import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/SignupNewaccount.module.scss";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db, storage } from "../../lib/firebaseInit";

export default function Index() {
  const {
    myInfo,
    setMyInfo,
    login,
    logout,
    newAccount,
    setNewAccount,
    isLoggedIn,
    loginChecked,
  } = useAuth();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>COMPLETE</title>
        <meta name="description" content="設定" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header back={true} backto={`signup/setname?id=${router.query.id}`} />

      <div className={styles.newAccountBox}>
        <p className={styles.text}>Instagramのプロフィール欄からチェック！</p>
        <p className={styles.newAccount}>\ NEW ACCOUNT /</p>
        <div className={styles.image + " " + styles[newAccount.color]}>
          <Image
            src={`/images/avatars/${newAccount.icon}.svg`}
            alt="場所カード"
            width="160"
            height="160"
          />
        </div>
        <p className={styles.name}>{newAccount.name}</p>
      </div>

      <div className={styles.btnBox}>
        <Link href={`/${router.query.id}`}>
          <a>マイページ</a>
        </Link>
      </div>
    </div>
  );
}
