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
          <p>好み調査</p>
          <Link href="/admin/design/illust">
            <a>A：イラストベース</a>
          </Link>
          <Link href="/admin/design/insta">
            <a>B：インスタ寄せ</a>
          </Link>

          <p>参考</p>
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
