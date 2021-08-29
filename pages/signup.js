import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Signup.module.scss";
import firebase, { db } from "../lib/firebaseInit";

export default function SignUp() {
  const signUp = async () => {
    console.log("ボタンアクション");
    const name = document.getElementById("name").value;
    const docid = document.getElementById("docid").value;
    const newUser = {
      name: name,
      job: "",
      bio: "",
    };
    if (name !== "") {
      await db.collection("users").doc(docid).set(newUser);
    }
    console.log("作成完了");
    document.getElementById("name").value = "";
    document.getElementById("docid").value = "";
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>新規登録</title>
        <meta name="description" content="超気軽に誘っちゃおう" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <Link href="/saikai_official">
          <a>saikai_official</a>
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.textBox}>
          <h1>新規登録</h1>
        </div>
        <div className={styles.inputBox}>
          <input id="docid" type="text" placeholder="InstagramIDを入力" />
          <input
            id="name"
            type="text"
            placeholder="あなたのニックネームを入力"
          />
        </div>
        <div className={styles.btnBox}>
          <button onClick={() => signUp()}>アカウントを追加</button>
        </div>
      </main>
    </div>
  );
}
