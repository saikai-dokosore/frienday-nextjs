import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/UserGood.module.scss";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useState, useEffect } from "react";

export default function Index() {
  const { myInfo, setMyInfo, myPlaces, setMyPlaces } = useAuth();
  const [followersCard, setFollowersCard] = useState(<div></div>);

  useEffect(() => {
    (async () => {
      let _followersCards = [];
      const followers = await db
        .collection("users")
        .doc(myInfo?.id)
        .collection("followers")
        .get();
      followers.forEach(async (f) => {
        const user = await db.collection("users").doc(f.id).get();
        _followersCards.push(
          <button className={styles.followerCard}>
            <div className={styles.image + " " + styles[user.data().color]}>
              <img src={`/images/avatars/${user.data().icon}.svg`} alt="" />
            </div>
            <div className={styles.profile}>
              <p className={styles.name}>{user.data().name}</p>
              <p className={styles.id}>{user.id}</p>
            </div>
          </button>
        );
      });

      // TODO: forEachが終わるまで待たないから、どうしようもない
      setTimeout(() => {
        setFollowersCard(
          <div className={styles.followerCardBox}>{_followersCards}</div>
        );
      }, 500);
    })();
  }, [myInfo]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Good一覧</title>
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
        <h2>Good一覧</h2>
      </div>
      <div className={styles.contentBox}>{followersCard}</div>
    </div>
  );
}
