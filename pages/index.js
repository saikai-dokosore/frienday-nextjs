import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";
import firebase, { db } from "../lib/firebaseInit";
import { useState, useEffect } from "react";

export default function Index() {
  console.log(db.collection("users").doc("VdGVn7pujtI1YeOiEsdF").get());

  const addUser = async () => {
    console.log("addUser");
    await db.collection("users").add({
      id: "testuser",
    });
    console.log("addedUser");
  };

  const updateUser = async () => {
    console.log("updateUser");
    const ref = db.collection("users").doc("VdGVn7pujtI1YeOiEsdF");
    console.log(ref);
    const snapshots = await ref.get();
    console.log(snapshots);
    db.collection("users").doc("VdGVn7pujtI1YeOiEsdF").set({
      id: "saikai_official",
    });
    console.log("updatedUser");
  };

  const getUsers = async () => {
    console.log("getUser");
    const users = await db.collection("users").get();
    let items = [];
    users.forEach(function (doc) {
      items.push(doc);
    });
    console.log(items[0].data().id);
  };

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
        <button onClick={() => addUser()}>Add</button>
        <button onClick={() => getUsers()}>Get</button>
        <button onClick={() => updateUser()}>Update</button>
      </main>
    </div>
  );
}
