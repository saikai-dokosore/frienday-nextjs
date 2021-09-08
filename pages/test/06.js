import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Test.module.scss";

export default function Index() {
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

      <main className={styles.main}>
        <img src="/images/06.png" />
      </main>
    </div>
  );
}
