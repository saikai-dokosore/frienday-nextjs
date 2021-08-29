import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";
import firebase, { db } from "../lib/firebaseInit";
import { useState, useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Index() {
  // console.log(db.collection("users").doc("VdGVn7pujtI1YeOiEsdF").get());

  // ログインユーザー情報を取得
  const { authChecking, currentUser } = useCurrentUser();
  useEffect(() => {
    console.log(currentUser);
  }, [authChecking, currentUser]);

  return (
    <div className={styles.container}>
      <Head>
        <title>home</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <Link href="/saikai_official">
          <a>saikai_official</a>
        </Link>
      </header>
      <main className={styles.main}>index</main>
    </div>
  );
}
