import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Signup.module.scss";

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ログイン</title>
        <meta name="description" content="超気軽に誘っちゃおう" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
      </header>

      <main className={styles.main}>ログインページ</main>
    </div>
  );
}
