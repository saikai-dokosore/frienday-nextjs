import Head from "next/head";
import styles from "../../styles/Signup.module.scss";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/router";
import { MdKeyboardArrowRight } from "react-icons/md";
import { db, storage } from "../../lib/firebaseInit";

export default function Welcome() {
  const { currentUser, userId, login, logout, getUserId } = useAuth();
  const router = useRouter();
  const usersCollection = db.collection("users");

  const createAccount = async (name, id, email) => {
    const newUser = {
      name: name,
      email: email,
      bio: "",
      job: "",
    };
    if (name === "") {
      alert("ニックネームが空です");
    } else if (!id) {
      alert("Instagram連携ができていません");
    } else if (email === undefined) {
      alert("Googleログインができていません");
    } else {
      const user = await usersCollection.doc(id).get();
      if (!user.data()) {
        await usersCollection.doc(id).set(newUser);
        router.push("/" + id);
      } else {
        alert("ユーザー作成済みです");
        router.push("/" + id);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>アカウント作成</title>
        <meta name="description" content="超気軽に誘っちゃおう" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
      </header>

      <main className={styles.main}>
        <ul className={styles.process}>
          <li>1</li>
          <div className={styles.line}></div>
          <li>2</li>
          <div className={styles.line}></div>
          <li>3</li>
        </ul>
        <div className={styles.title}>
          <h1>Friendayへようこそ</h1>
          <p>Welcome to Frienday</p>
        </div>
        <div className={styles.actionBox}>
          <p>最後にとっておきのニックネームをつけましょう</p>
          <div className={styles.inputBox}>
            <p>Name</p>
            <input id="nickname" type="text" />
          </div>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.nextText}>
            <p>ページを発行</p>
          </div>
          <button
            className={styles.nextArrow}
            onClick={() =>
              createAccount(
                document.getElementById("nickname").value,
                userId,
                currentUser?.email
              )
            }
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}
