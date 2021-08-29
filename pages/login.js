import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Signup.module.scss";
import { useState, useEffect } from "react";
import {
  signupWithEmailAndPassword,
  signinWithEmailAndPassword,
} from "../lib/firebaseInit";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (event) => {
    event.preventDefault();
    const user = await signupWithEmailAndPassword(email, password);
    console.log(user);
  };
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

      <main className={styles.main}>
        <form onSubmit={signup}>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="パスワード"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">送信</button>
        </form>
      </main>
    </div>
  );
}
