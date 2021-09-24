import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/PlaceSend.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";

export default function Index() {
  const router = useRouter();
  const { myInfo } = useAuth();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar(("00" + (Math.floor(Math.random() * 16) + 1)).slice(-2));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>メッセージ完了!</title>
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
              src={`/images/avatars/${avatar}.svg`}
              alt="場所カード"
              width={200}
              height={200}
              quality={100}
            />
          </div>
          <div className={styles.hashtag}>
            <p>THANK YOU!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
