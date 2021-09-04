import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Signup.module.scss";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight, MdFileUpload } from "react-icons/md";

import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

export default function Index() {
  // Auth
  const { currentUser, userId, login, logout, getUserId } = useAuth();
  const {
    name,
    job,
    bio,
    accountImgUrl,
    setName,
    setJob,
    setBio,
    setAccountInfo,
    setAccountImgUrl,
  } = useAuth();
  const router = useRouter();
  const [uploadImage, setUploadImage] = useState();
  console.log("uploadImage", uploadImage);

  useEffect(() => {
    if (!currentUser) {
      //router.push("/signup/welcome");
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
    await setAccountInfo();
    alert("更新しました");
  };

  const previewImg = (event) => {
    const img = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      document.getElementById("image").src = reader.result;
    };
    setUploadImage(img);
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
        <div className={styles.actionBox}>
          <div className={styles.imgBox}>
            <div className={styles.accountImgBox + " " + styles.green100}>
              <img
                id="image"
                src={accountImgUrl === "" ? "" : accountImgUrl}
                alt=""
              />
            </div>
            <label htmlFor="file-upload" className={styles.select}>
              <MdFileUpload />
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(event) => {
                previewImg(event);
              }}
            />
          </div>
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
        </div>
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
