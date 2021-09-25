import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/UserNortification.module.scss";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function Index() {
  const { myInfo, setMyInfo, myPlaces, setMyPlaces } = useAuth();
  const [nortificationCards, setNortificationCards] = useState(<div></div>);
  const [user, setUser] = useState({ id: "", name: "", icon: "", color: "" });

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
          <button
            className={styles.nortificationCard}
            onClick={() => {
              document.getElementById("modal").style.display = "flex";
              setUser({
                id: n.data().userId,
                name: user.data().name,
                icon: user.data().icon,
                color: user.data().color,
              });
            }}
          >
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

      // TODO: forEachが終わるまで待たないから、どうしようもない
      setTimeout(() => {
        setNortificationCards(
          <div className={styles.nortificationCardBox}>
            {_nortificationCards}
          </div>
        );
      }, 500);
    })();
  }, [myInfo]);

  // メニューモーダル
  if (typeof window !== "undefined") {
    window.onclick = (event) => {
      const modal = document.getElementById("modal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>通知</title>
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

      <div id="modal" className={styles.modal}>
        <Link href={`instagram://user?username=${user.id}`}>
          <a className={styles.modalContent}>
            <div
              className={styles.cancel}
              onClick={() => {
                document.getElementById("modal").style.display = "none";
              }}
            >
              <IoCloseSharp />
            </div>
            <p className={styles.top}>InstagramでDMを送る</p>
            <div className={styles.image + " " + styles[user.color]}>
              <img src={`/images/avatars/${user.icon}.svg`} alt="" />
            </div>
            <div className={styles.profile}>
              <p className={styles.name}>{user.name}</p>
              <p className={styles.id}>{user.id}</p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
