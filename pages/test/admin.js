import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Test.module.scss";

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

      <main className={styles.admin}>
        <h1>DEMO PAGE</h1>
        <div>
          <Link href="/test/01">
            <a>デモ01</a>
          </Link>
          <Link href="/test/02">
            <a>デモ02</a>
          </Link>
          <Link href="/test/03">
            <a>デモ03</a>
          </Link>
          <Link href="/test/04">
            <a>デモ04</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
