import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/User.module.scss";
import headerStyles from "../../styles/Header.module.scss";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useState, useEffect } from "react";

export default function Index() {
  // Auth
  const { myInfo, setMyInfo, placeCards, setPlaceCards, login, logout } =
    useAuth();
  const router = useRouter();
  const [nortifications, setNortifications] = useState(<div></div>);

  useEffect(() => {
    const allMessages = {};
    const getAllMessages = async () => {
      const placeCollections = await db
        .collection("users")
        .doc("saikai_official")
        .collection("place");
      const places = await placeCollections.get();
      places.forEach(async (p) => {
        let name = p.data().name;
        let emoji = p.data().emoji;
        let month = p.data().month;
        const messages = await placeCollections
          .doc(p.id)
          .collection("messages")
          .get();
        messages.forEach(async (m) => {
          if (!allMessages[name]) {
            allMessages[name] = [];
          }
          allMessages[name].push({
            content: m.data().content,
            read: m.data().read,
            sentby: m.data().sentby,
            senttime: m.data().senttime,
          });
        });
      });
    };
    const setMessagesComps = async () => {
      let ulComps = [];
      for (let i = 0; i < Object.keys(allMessages).length; i++) {
        let key = Object.keys(allMessages)[i];
        let comp = allMessages[key].map((p, i) => {
          return (
            <li key={i}>
              <p>{p?.content}</p>
              <p>{p?.sentby}</p>
            </li>
          );
        });
        ulComps.push(
          <ul key={i}>
            <p>{key}</p>
            {comp}
          </ul>
        );
      }
      setNortifications(<div>{ulComps}</div>);
    };

    // なぜか2回実行しないと反映されない
    (async () => {
      await getAllMessages();
      await getAllMessages();
      await setMessagesComps();
    })();
  }, []);

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
      <Header />

      <div className={styles.top}>
        <div className={styles.image + " " + styles[myInfo?.color]}>
          <img src={`/images/avatars/${myInfo?.icon}}.svg`} alt="" />
        </div>
        <h2>通知一覧</h2>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.itemBox}>使い方</div>
        <div className={styles.itemBox}>ログアウト</div>
        <div className={styles.itemBox}>アカウント削除</div>
        <div className={styles.itemBox}>アプリダウンロード</div>
      </div>
    </div>
  );
}
