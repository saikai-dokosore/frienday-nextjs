import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Welcome() {
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();
  const getCodeUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTA_CLIENT_ID}&redirect_uri=https%3A%2F%2Ffrienday.vercel.app%2FgetInsta&scope=user_profile,user_media&response_type=code`;

  // if (currentUser) {
  //   router.push(getCodeUrl);
  // }

  const handleLoginButton = async () => {
    await login();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>アカウント作成</title>
        <meta name="description" content="超気軽に誘っちゃおう" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          <p>
            あなたのInstagramの
            <br />
            リンク欄は空いていますか？
            <br />
            FriendayはInstagramのリンク欄に
            <br />
            貼っておくだけで、
            <br />
            友達に誘われるかもしれないサービスです。
            <br />
            あなたのインスタライフが
            <br />
            少しだけ充実しますよ。
          </p>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.nextText}>
            <p>マイページを作成</p>
          </div>
          <Link href="/getInsta">
            <div className={styles.nextArrow}>
              <a>
                <MdKeyboardArrowRight />
              </a>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
