import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/PlaceDetails.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/auth";
import { db } from "../../lib/firebaseInit";
import Header from "../../lib/header";

export default function Index() {
  const router = useRouter();
  const { myInfo } = useAuth();
  const [viewUserName, setViewUserName] = useState("");
  const [place, setPlace] = useState({ name: "", icon: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const placeDb = await db
        .collection("users")
        .doc(router.query.id)
        .collection("places")
        .doc(router.query.key)
        .get();
      setPlace({ name: placeDb.data()?.name, icon: placeDb.data()?.icon });
      const user = await db.collection("users").doc(router.query.id).get();
      setViewUserName(user.data()?.name);
    })();
  }, []);

  const sendMessage = async () => {
    if (myInfo) {
      await db
        .collection("users")
        .doc(router.query.id)
        .collection("places")
        .doc(router.query.key)
        .collection("gowith")
        .add({
          userId: myInfo?.id,
          message: message,
          createdAt: new Date(),
        });
    }
    router.push(`/place/send?id=${router.query.id}`);
  };

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
      <Header back={true} backto={router.query.id} />

      <div className={styles.placePage}>
        <div className={styles.placeCard}>
          <div className={styles.image}>
            <Image
              src={`/images/avatars/${place?.icon}.svg`}
              alt="場所カード"
              width={200}
              height={200}
              quality={100}
            />
          </div>
          <div className={styles.hashtag}>
            <p>#{place.name}</p>
          </div>
        </div>
        <div className={styles.hashtags}>
          <Image
            src={`/images/hashtagImage.png`}
            alt="ハッシュタグ画像"
            width={342}
            height={342}
            quality={100}
          />
        </div>
        <p className={styles.isGood}>{viewUserName}はあなたをGoodしています!</p>
        <div className={styles.sendBox}>
          <input
            type="text"
            placeholder="一緒に行こう！"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button
            onClick={() => {
              if (!myInfo) {
                alert("ログインできていません");
              }
              sendMessage();
            }}
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}
