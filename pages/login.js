import Head from "next/head";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";

export default function Login() {
  // Auth
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();

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
        {currentUser && (
          <div>
            <h2>ログインしています.</h2>
            <button onClick={handleLogoutButton}>ログアウト</button>
            <button onClick={() => router.push("/")}>マイページへ</button>
          </div>
        )}
        {!currentUser && (
          <div>
            <h2>ログインしていません.</h2>
            <button onClick={handleLoginButton}>ログイン</button>
          </div>
        )}
      </main>
    </div>
  );
}
