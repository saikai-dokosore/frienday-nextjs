import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/UserNortification.module.scss";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useState, useEffect } from "react";

export default function Index() {
  const { myInfo, setMyInfo, myPlaces, setMyPlaces } = useAuth();
  const [nortificationCards, setNortificationCards] = useState(<div></div>);

  useEffect(() => {
    (async () => {
      let _nortificationCards = [];
      const nortifications = await db
        .collection("users")
        .doc(myInfo?.id)
        .collection("nortifications")
        .get();

      nortifications.forEach(async (n) => {
        const user = await db.collection("users").doc(n.data().userId).get();
        const date = n.data().createdAt.toDate();
        const displayDate = `${("00" + (date.getMonth() + 1)).slice(-2)}/${(
          "00" + date.getDate()
        ).slice(-2)}/${("00" + date.getHours()).slice(-2)}:${(
          "00" + date.getMinutes()
        ).slice(-2)}`;

        _nortificationCards.push(
          <button className={styles.nortificationCard}>
            <div className={styles.topBox}>
              <div className={styles.hashtag}>#{n.data().hashtag}</div>
              <div className={styles.date}>{displayDate}</div>
            </div>
            <div className={styles.mainBox}>
              <div className={styles.image + " " + styles[user.data().color]}>
                <img src={`/images/avatars/${user.data().icon}.svg`} alt="" />
              </div>
              <div className={styles.profileBox}>
                <div className={styles.profile}>
                  <p className={styles.name}>{user.data().name}</p>
                  <p className={styles.id}>{n.data().userId}</p>
                </div>
                <div className={styles.message}>{n.data().message}</div>
              </div>
            </div>
          </button>
        );
      });
      setNortificationCards(
        <div className={styles.nortificationCardBox}>{_nortificationCards}</div>
      );
    })();
  }, [myInfo]);

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
        <h2>通知一覧</h2>
      </div>
      <div className={styles.contentBox}>{nortificationCards}</div>
    </div>
  );
}
