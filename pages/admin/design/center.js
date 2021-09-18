import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/DesignCenter.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../../lib/firebaseInit";
import { useAuth } from "../../../lib/auth";

// コンポーネント
export default function Index() {
  const router = useRouter();
  const storageRef = storage.ref();

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
  const [isMine, setIsMine] = useState(false);
  const [isFollowYou, setIsFollowYou] = useState(false);

  const [youGoods, setYouGoods] = useState(0);
  const [totalGoods, setTotalGoods] = useState(240);

  const colors = ["blue", "red", "yellow", "green"];

  const monthEmoji = {
    Jan: "0x1F338",
    Feb: "0x1F338",
    Mar: "0x1F338",
    Apr: "0x1F338",
    May: "0x1F338",
    Jun: "0x1F40C",
    Jul: "0x1F338",
    Aug: "0x1F338",
    Sep: "0x1F338",
    Oct: "0x1F338",
    Nov: "0x1F338",
    Dec: "0x1F338",
  };

  // マイページ判定
  useEffect(() => {
    // if (myInfo) {
    //   setIsMine(myInfo.id === viewUserId ? true : false);
    // }
    setIsMine(true);
  }, [myInfo]);

  // いきたい場所リストの取得
  useEffect(() => {
    let _placeCards = [];
    for (let i = 0; i < 6; i++) {
      const randomNum = Math.floor(Math.random() * 104) + 1;
      _placeCards.push(
        <Link href={`/admin/design/place?id=${randomNum}`}>
          <a>
            <div className={styles.placeCard}>
              <div className={styles.image}>
                <Image
                  src={`/images/avatar/peep-${randomNum}.svg`}
                  alt=""
                  width={160}
                  height={160}
                />
              </div>
              <div className={styles.hashtag}>
                <p>#表参道カフェ</p>
              </div>
            </div>
          </a>
        </Link>
      );
    }
    setPlaceCards(<div className={styles.placeCardBox}>{_placeCards}</div>);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>中央寄せテスト</title>
        <meta name="description" content="中央寄せテスト" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.image}>
        <Image
          src={"/images/center/centerProfile.png"}
          alt=""
          width={1500}
          height={932}
        />
      </div>

      <div className={styles.placeTitle}>
        <h3>\ 9月の気になる場所 /</h3>
      </div>
      {placeCards}

      <div className={styles.loginBox}>
        <button
          onClick={() => {
            logout();
          }}
        >
          ログアウトボタン
        </button>
        <button
          onClick={() => {
            login();
          }}
        >
          ログインボタン
        </button>
      </div>
    </div>
  );
}
