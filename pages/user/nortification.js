import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Signup.module.scss";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useState, useEffect } from "react";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

export default function Index() {
  // Auth
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();
  const [nortifications, setNortifications] = useState(<div></div>);

  useEffect(() => {
    if (!currentUser) {
      router.push("/signup/welcome");
    }
  }, [currentUser, router]);

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
        <title>home</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <div className={styles.headerBtnBox}>
          <Link href="/user/nortification">
            <a>
              <div className={styles.nortification}>
                <HiOutlineBell />
              </div>
            </a>
          </Link>
          <Link href="/user/setting">
            <a>
              <div className={styles.user}>
                <HiOutlineCog />
              </div>
            </a>
          </Link>
          <Link href={currentUser ? `/saikai_official` : "/signup/welcome"}>
            <a>
              <div className={styles.user}>
                <HiOutlineUserCircle />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>通知一覧</h1>
        </div>
        <div className={styles.actionBox}>{nortifications}</div>
      </main>
    </div>
  );
}
