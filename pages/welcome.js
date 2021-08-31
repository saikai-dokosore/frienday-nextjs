import Head from "next/head";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
var FormData = require("form-data");

export default function Welcome() {
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();
  const getCodeUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTA_CLIENT_ID}&redirect_uri=https%3A%2F%2Ffrienday.vercel.app%2FgetInsta&scope=user_profile,user_media&response_type=code`;

  if (currentUser) {
    router.push(getCodeUrl);
  }

  const handleLoginButton = async () => {
    await login();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ログイン</title>
        <meta name="description" content="超気軽に誘っちゃおう" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Friendayへようこそ</h1>
          <p>
            あなたのInstagramのリンク欄は空いていますか？
            FriendayのマイページをあなたのInstagramのリンク欄に貼れば、あなたが気になる友達から誘われる、、かも。
          </p>
        </div>
        <button onClick={handleLoginButton}>マイページを作成する</button>
      </main>
    </div>
  );
}
