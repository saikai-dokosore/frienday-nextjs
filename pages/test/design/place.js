import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/Design.module.scss";
import { useState, useEffect } from "react";
import anime from "animejs";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
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
        <Image
          src={`/images/place${router.query.id}.png`}
          alt="Profile Picture"
          width={100}
          height={100}
        />
        <p>あなたはグッドされていません</p>
        <button onClick={() => {}}>いきたい！</button>
      </div>
    </div>
  );
}
