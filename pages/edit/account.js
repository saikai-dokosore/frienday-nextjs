import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/EditAccount.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";

// コンポーネント
export default function Index() {
  const { myInfo, setMyInfo } = useAuth();

  const [colors, setColors] = useState([]);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    document.getElementById("name").value = myInfo?.name;
  }, []);

  let colorSets = ["red", "blue", "green", "yellow"];
  useEffect(() => {
    // color
    let _colors = [];
    for (let i = 0; i < 4; i++) {
      _colors.push(
        <button
          className={styles[colorSets[i]]}
          onClick={() => {
            setMyInfo({
              ...myInfo,
              ...{
                color: colorSets[i],
              },
            });
          }}
        ></button>
      );
    }
    setColors(_colors);
    // avatar
    let _avatars = [];
    for (let i = 1; i < 17; i++) {
      _avatars.push(
        <button
          className={styles.image}
          onClick={() => {
            setMyInfo({
              ...myInfo,
              ...{
                icon: ("00" + i).slice(-2),
              },
            });
          }}
        >
          <img src={`/images/avatars/${("00" + i).slice(-2)}.svg`} alt="" />
        </button>
      );
    }
    setAvatars(_avatars);
  }, [myInfo]);

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

      <Header />

      <div className={styles.backBtnBox}>
        <Link href={`/${myInfo?.id}`}>
          <a>Back</a>
        </Link>
      </div>

      <div className={styles.profileBox}>
        <div className={styles.profile}>
          <div className={styles.image + " " + styles[myInfo?.color]}>
            <img src={`/images/avatars/${myInfo?.icon}.svg`} alt="" />
          </div>
          <div className={styles.colorBox}>{colors}</div>
          <div className={styles.avatarBox}>{avatars}</div>
          <div className={styles.name}>
            <input
              id="name"
              onChange={(event) => {
                setMyInfo({ ...myInfo, ...{ name: event.target.value } });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
