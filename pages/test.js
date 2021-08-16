import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>sakusaku</title>
        <meta name="description" content={"test" + "を気軽に誘っちゃおう"} />
        <link rel="icon" href="/favicon.ico" />
        {/* ここでOGPも設定したい */}
      </Head>

      <header className={styles.header}>
        <h1>SAKUSAKU</h1>
        <Link href="/saikai">
          <a>saikai</a>
        </Link>
      </header>

      <main className={styles.main}>サクサクページ</main>
    </div>
  );
}
