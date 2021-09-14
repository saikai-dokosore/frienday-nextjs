import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/EditAccount.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useAuth } from "../../lib/auth";

// コンポーネント
export default function Index() {
  const router = useRouter();
  const storageRef = storage.ref();

  const {
    myInfo,
    setMyInfo,
    profileImg,
    setProfileImg,
    placeCards,
    setPlaceCards,
    profileColor,
    setProfileColor,
  } = useAuth();

  useEffect(() => {
    document.getElementById("name").value = myInfo.name;
  }, []);
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

      <header className={styles.header}>
        <h1>Instago</h1>
      </header>

      <div className={styles.backBtnBox}>
        <Link href={`/${myInfo.id}`}>
          <a>Back</a>
        </Link>
      </div>

      <div className={styles.profileBox}>
        <div className={styles.profile}>
          <div className={styles.image + " " + styles[profileColor]}>
            {profileImg}
          </div>
          <div className={styles.colorBox}>
            <button
              className={styles.red}
              onClick={() => {
                setProfileColor("red");
              }}
            ></button>
            <button
              className={styles.blue}
              onClick={() => {
                setProfileColor("blue");
              }}
            ></button>
            <button
              className={styles.yellow}
              onClick={() => {
                setProfileColor("yellow");
              }}
            ></button>
            <button
              className={styles.green}
              onClick={() => {
                setProfileColor("green");
              }}
            ></button>
          </div>
          <div className={styles.name}>
            <input
              id="name"
              onChange={(event) => {
                setMyInfo(Object.assign(myInfo, { name: event.target.value }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
