import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";
import firebase from "../lib/firebaseInit";
import { useState, useEffect } from "react";

export default function Index() {
  const db = firebase.firestore();
  const [test, setTest] = useState("test");

  const getUsers = async () => {
    const saikai = db.collection("users").doc("wkqfA90zWaaDGX5tf0lu").get();
    console.log(saikai);
  };
  getUsers();

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
        <Link href="/saikai">
          <a>saikai</a>
        </Link>
      </header>
      <main className={styles.main}>
        <h1>index</h1>
        {test}
      </main>
    </div>
  );
}
