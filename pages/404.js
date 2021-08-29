import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <Head>
        <title>アカウントがありません</title>
        <meta name="description" content="404ページです" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <Link href="/login">
          <a>login</a>
        </Link>
      </header>

      <main className={styles.main}>アカウントが存在しません</main>
    </div>
  );
}
