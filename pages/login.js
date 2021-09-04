import Head from "next/head";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect } from "react";

export default function Login() {
  // Auth
  const { currentUser, userId, login, logout, getUserId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser && userId) {
      router.push("/" + userId);
    }
  }, [currentUser, userId]);

  const handleLoginButton = async () => {
    await login();
  };
  const handleLogoutButton = () => {
    logout();
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
        <div className={styles.title}>
          <h1>ログイン</h1>
          <p>Login</p>
        </div>

        <div className={styles.btnBox}>
          <div className={styles.nextText}>
            <p>ログインする</p>
          </div>
          <button
            className={styles.nextArrow}
            onClick={() => handleLoginButton()}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}
