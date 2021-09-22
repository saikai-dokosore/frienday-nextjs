import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/DesignPlace.module.scss";
import { useState, useEffect } from "react";
import anime from "animejs";
import { useRouter } from "next/router";
import { useAuth } from "../../../lib/auth";

export default function Index() {
  const router = useRouter();
  const [hashtagImages, setHashtagImages] = useState(
    <div className={styles.hashtags}></div>
  );
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

  useEffect(() => {
    let list = [];
    for (let i = 1; i < 10; i++) {
      list.push(
        <div className={styles.imageBox}>
          <img src={`/images/hashtag/andpeople0${i}.png`} alt="" />
        </div>
      );
    }
    setHashtagImages(<div className={styles.hashtags}>{list}</div>);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>管理者ページ</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.placePage}>
        <div className={styles.placeCard}>
          <div className={styles.image}>
            <Image
              src={`/images/avatar/peep-${router.query.id}.svg`}
              alt=""
              width={160}
              height={160}
            />
          </div>
          <div className={styles.hashtag}>
            <p>#表参道カフェ</p>
          </div>
        </div>
        {hashtagImages}
        <p className={styles.isGood}>{myInfo?.name}はあなたをGoodしています!</p>
        <div className={styles.sendBox}>
          <input type="text" placeholder="一緒に行こう！" />
          <button onClick={() => {}}>送信</button>
        </div>
      </div>
    </div>
  );
}
