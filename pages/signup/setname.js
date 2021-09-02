import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/router";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Welcome() {
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();

  const createAccount = async (name, id, email) => {
    console.log(name, id, email);
    router.push("/" + id);
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
          <div
            className={styles.nextArrow}
            onClick={() =>
              createAccount(
                document.getElementById("nickname").value,
                profiledata.username,
                currentUser.email
              )
            }
          >
            <a>
              <MdKeyboardArrowRight />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
