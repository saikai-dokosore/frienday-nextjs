import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Index.module.scss";

export default function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Frienday</title>
        <meta name="description" content="Friendayアプリです" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Frienday説明用のページ</h1>
        <Link href="/saikai">
          <a>saikai</a>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
