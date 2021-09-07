import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Design.module.scss";

export default function Index() {
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
        <div className={styles.cover}></div>
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
              console.log("pomu");
            }}
            className={styles.pomu}
          >
            ポムる
          </button>
        </div>
      </div>
      <div className={styles.placeBox}>
        <h3>今月行きたいところ</h3>
        <div className={styles.places}>
          <div className={styles.imgBox}>
            <Image src={"/images/cafe.jpeg"} alt="" width={500} height={500} />
          </div>
          <div className={styles.imgBox}>
            <Image
              src={"/images/disney.jpeg"}
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
