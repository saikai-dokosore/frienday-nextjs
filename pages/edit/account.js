import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Signup.module.scss";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

export default function Index() {
  // Auth
  const { currentUser, userId, login, logout, getUserId } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.push("/signup/welcome");
    }
  }, [currentUser, router]);

  useEffect(() => {
    (async () => {
      if (userId) {
        const user = await db.collection("users").doc(userId).get();
        setName(user.data().name);
        setJob(user.data().job);
        setBio(user.data().bio);
      }
    })();
  }, [userId]);

  const updateInfo = async () => {
    if (userId) {
      await db.collection("users").doc(userId).update({
        name: name,
        job: job,
        bio: bio,
      });
    }
    alert("更新しました");
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
        <div className={styles.headerBtnBox}>
          <Link href="/nortification">
            <a>
              <div className={styles.nortification}>
                <HiOutlineBell />
              </div>
            </a>
          </Link>
          <Link href="/setting">
            <a>
              <div className={styles.user}>
                <HiOutlineCog />
              </div>
            </a>
          </Link>
          <Link href={currentUser ? `/${userId}` : "/signup/welcome"}>
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
          <h1>アカウント情報編集</h1>
          <p></p>
        </div>
        <form className={styles.actionBox}>
          <div className={styles.name}>
            <h3>Name</h3>
            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>{" "}
          <div className={styles.job}>
            <h3>Job</h3>
            <input
              type="text"
              value={job}
              onChange={(event) => {
                setJob(event.target.value);
              }}
            />
          </div>{" "}
          <div className={styles.bio}>
            <h3>Bio</h3>
            <textarea
              type="text"
              value={bio}
              onChange={(event) => {
                setBio(event.target.value);
              }}
            />
          </div>
        </form>
        <div className={styles.btnBox}>
          <div className={styles.nextText}>
            <p>更新</p>
          </div>
          <button className={styles.nextArrow} onClick={() => updateInfo()}>
            <MdKeyboardArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}
