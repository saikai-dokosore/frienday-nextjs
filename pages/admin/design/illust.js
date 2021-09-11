import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/DesignIllust.module.scss";
import { useState, useEffect } from "react";
import anime from "animejs";

export default function Index() {
  const [goodNum, setGoodNum] = useState(10);
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
          <h1>Instago</h1>
        </div>
        <div className={styles.cover} id="cover"></div>
      </div>
      <div className={styles.prifileBox}>
        <div className={styles.image}>
          <Image
            src={"/images/illust/profile.png"}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.profile}>
          <p className={styles.name}>さいかい</p>
          <p className={styles.goodnum}>{goodNum}Goods</p>
          <p className={styles.isgooded}>グッドされています</p>

          <button
            onClick={() => {
              setGoodNum(goodNum + 1);
            }}
            className={styles.pomu}
          >
            グッド
          </button>
        </div>
      </div>
      <div className={styles.placeTitle}>
        <h3>\ 今月行きたいところ /</h3>
      </div>
      <div className={styles.placeBox}>
        <div className={styles.places}>
          <Link href={"/admin/design/illust-place?id=01"}>
            <a>
              <div className={styles.imgBox}>
                <Image
                  src={"/images/illust/place01.png"}
                  alt=""
                  width={100}
                  height={120}
                />
              </div>
            </a>
          </Link>
          <Link href={"/admin/design/illust-place?id=02"}>
            <a>
              <div className={styles.imgBox}>
                <Image
                  src={"/images/illust/place02.png"}
                  alt=""
                  width={100}
                  height={120}
                />
              </div>
            </a>
          </Link>
          <Link href={"/admin/design/illust-place?id=03"}>
            <a>
              <div className={styles.imgBox}>
                <Image
                  src={"/images/illust/place03.png"}
                  alt=""
                  width={100}
                  height={120}
                />
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.places}>
          <Link href={"/admin/design/illust-place?id=01"}>
            <a>
              <div className={styles.imgBox}>
                <Image
                  src={"/images/illust/place01.png"}
                  alt=""
                  width={100}
                  height={120}
                />
              </div>
            </a>
          </Link>
          <Link href={"/admin/design/illust-place?id=02"}>
            <a>
              <div className={styles.imgBox}>
                <Image
                  src={"/images/illust/place02.png"}
                  alt=""
                  width={100}
                  height={120}
                />
              </div>
            </a>
          </Link>
          <Link href={"/admin/design/illust-place?id=03"}>
            <a>
              <div className={styles.imgBox}>
                <Image
                  src={"/images/illust/place03.png"}
                  alt=""
                  width={100}
                  height={120}
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
