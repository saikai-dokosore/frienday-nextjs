import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

export default function Index() {
  // Auth
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/signup/welcome");
    }
  }, [currentUser, router]);

  const handleLoginButton = async () => {
    await login();
  };
  const handleLogoutButton = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>home</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <div className={styles.headerBtnBox}>
          <Link href="/nortification">
            <a>
              <div className={styles.nortification}>
                <HiOutlineBell />
              </div>
            </a>
          </Link>
          <Link href="/setting">
            <a>
              <div className={styles.user}>
                <HiOutlineCog />
              </div>
            </a>
          </Link>
          <Link href={currentUser ? `/saikai_official` : "/signup/welcome"}>
            <a>
              <div className={styles.user}>
                <HiOutlineUserCircle />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>設定</h1>
          <p></p>
        </div>
        <div className={styles.actionBox}>
          <button
            onClick={() => {
              handleLogoutButton();
            }}
          >
            ログアウト
          </button>
          <button
            onClick={() => {
              handleLogoutButton();
            }}
          >
            アカウント削除
          </button>
        </div>
      </main>
    </div>
  );
}
