import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/SignupSetinsta.module.scss";
import { useAuth } from "../../lib/auth";
import SignupHeader from "../../lib/signupHeader";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Index() {
  const [newId, setNewId] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>インスタID</title>
        <meta name="description" content="設定" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <SignupHeader title={"Instagram連携"} enable={1} />

      <div className={styles.top}>
        <div className={styles.image + " " + styles.blue}>
          <img src={`/images/avatars/01.svg`} alt="" />
        </div>
      </div>

      <div className={styles.contentBox}>
        <div className={styles.inputBox}>
          <p className={styles.text}>
            InstagramのIDを
            <br />
            入力してください
          </p>
          <input
            type="text"
            placeholder={"saikai_official"}
            onChange={(event) => {
              setNewId(event.target.value);
            }}
          />
        </div>
        {newId !== "" ? (
          <div className={styles.btnBox}>
            <p className={styles.text}>
              ありがとうございます!
              <br />
              次はGoogleログインへ進んでください
            </p>
            <Link href={`/signup/setname?id=${newId}`}>
              <a className={styles.enable}>Googleログイン</a>
            </Link>
          </div>
        ) : (
          <div className={styles.btnBox}>
            <p className={styles.text}>IDを入力してください</p>
            <a className={styles.disable}>次のステップ</a>
          </div>
        )}
      </div>
    </div>
  );
}
