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
          <Link href="/test/05">
            <a>デモ05</a>
          </Link>
          <Link href="/test/07">
            <a>デモ07</a>
          </Link>
          <Link href="/test/08">
            <a>デモ08</a>
          </Link>
          <Link href="/test/design">
            <a>デモ09</a>
          </Link>
          <Link href="/saikai_official">
            <a>saikai_official</a>
          </Link>
          <Link href="https://vsco.co/saikai0011">
            <a>VSCO</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
