import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Design.module.scss";
import { useState, useEffect } from "react";
import anime from "animejs";

export default function Index() {
  const animation = () => {
    const elem = document.getElementById("elem");
    anime({
      targets: elem,
      translateY: 100,
      duration: 2000,
      direction: "alternate",
    });
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

      <div className={styles.coverBox}>
        <div className={styles.title}>
          <h1>FRIENDAY</h1>
        </div>
        <div className={styles.cover}>
          <div className={styles.ball} id="elem"></div>
        </div>
      </div>
      <div className={styles.prifileBox}>
        <div className={styles.image}>
          <Image
            src={"/images/profile_image.jpg"}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.profile}>
          <p className={styles.name}>さいかい</p>
          <p className={styles.isPomed}>ポムられています</p>
          <p className={styles.bio}>
            お盆は12〜16日まで帰省してますので、
            <br />
            皆さん遊んで〜
          </p>
          <button
            onClick={() => {
              animation();
            }}
            className={styles.pomu}
          >
            ポムる
          </button>
        </div>
      </div>
      <div className={styles.placeTitle}>
        <h3>今月行きたいところ</h3>
      </div>
      <div className={styles.placeBox}>
        <div className={styles.places}>
          <div className={styles.imgBox}>
            <Image
              src={"/images/cafe02.jpeg"}
              alt=""
              width={500}
              height={500}
            />
            <p># 表参道カフェ</p>
          </div>
          <div className={styles.imgBox}>
            <Image
              src={"/images/disney02.jpeg"}
              alt=""
              width={500}
              height={500}
            />
          </div>
          <div className={styles.imgBox}>
            <Image src={"/images/apex.jpeg"} alt="" width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  );
}
