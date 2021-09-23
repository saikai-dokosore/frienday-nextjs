import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/EditPlace.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";

// コンポーネント
export default function Index() {
  const router = useRouter();
  const { myInfo, setMyInfo, myPlaces, setMyPlaces } = useAuth();
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    document.getElementById("name").value = myPlaces?.[router.query.id]?.name;
  }, []);

  useEffect(() => {
    // avatar
    let _avatars = [];
    for (let i = 1; i < 17; i++) {
      _avatars.push(
        <button
          className={styles.image}
          onClick={() => {
            setMyPlaces({
              ...myPlaces,
              ...{
                [router.query.id]: {
                  name: myPlaces?.[router.query.id]?.name,
                  icon: ("00" + i).slice(-2),
                },
              },
            });
          }}
        >
          <img src={`/images/avatars/${("00" + i).slice(-2)}.svg`} alt="" />
        </button>
      );
    }
    setAvatars(_avatars);
  }, [myInfo]);

  return (
    <div className={styles.container}>
      <Head>
        <title>アカウント編集</title>
        <meta name="description" content="アカウント編集画面" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <div className={styles.backBtnBox}>
        <Link href={`/${myInfo?.id}`}>
          <a>Back</a>
        </Link>
      </div>

      <div className={styles.placeCardBox}>
        <div className={styles.placeCard}>
          <div className={styles.image}>
            <Image
              src={`/images/avatars/${myPlaces?.[router.query.id]?.icon}.svg`}
              alt="場所カード"
              width="160"
              height="160"
            />
          </div>
          <div className={styles.hashtag}>
            <p>#{myPlaces?.[router.query.id]?.name}</p>
          </div>
        </div>
        <div className={styles.avatarBox}>{avatars}</div>
        <div className={styles.name}>
          <input
            id="name"
            onChange={(event) => {
              setMyPlaces({
                ...myPlaces,
                ...{
                  [router.query.id]: {
                    name: event.target.value,
                    icon: myPlaces?.[router.query.id]?.icon,
                  },
                },
              });
            }}
          />
        </div>

        <div className={styles.btnBox}>
          <button className={styles.delete}>このカードを削除</button>
          <Link href={`/edit/newpost?id=${router.query.id}`}>
            <a className={styles.ok + " " + styles[myInfo?.color]}>更新</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
