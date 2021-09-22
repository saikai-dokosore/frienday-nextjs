import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Signup.module.scss";
import headerStyles from "../../styles/Header.module.scss";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

export default function Index() {
  const {
    myInfo,
    setMyInfo,
    profileImg,
    setProfileImg,
    placeCards,
    setPlaceCards,
    profileColor,
    setProfileColor,
    login,
    logout,
  } = useAuth();
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

      <header className={headerStyles.header}>
        <h1>Instago</h1>
        <div
          className={headerStyles.icon}
          onClick={() => {
            document.getElementById("menu").style.display = "block";
          }}
        >
          {profileImg}
        </div>
        <div id="menu" className={headerStyles.menu}>
          <div className={headerStyles.menuContent}>
            <Link href={"/user/nortification"}>
              <div className={headerStyles.items}>
                <a>通知一覧</a>
              </div>
            </Link>
            <Link href={"/user/goods"}>
              <div className={headerStyles.items}>
                <a>Good一覧</a>
              </div>
            </Link>
            <Link href={`/${myInfo?.id}`}>
              <div className={headerStyles.items}>
                <a>マイページ編集</a>
              </div>
            </Link>
            <Link href={"/user/setting"}>
              <div className={headerStyles.items}>
                <a>設定</a>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div>Good一覧</div>
    </div>
  );
}
