import Head from "next/head";
import styles from "../../styles/Signup.module.scss";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/router";
var FormData = require("form-data");
import { MdKeyboardArrowRight } from "react-icons/md";

// サーバーサイド
export const getServerSideProps = async (context) => {
  const code = await context.query?.code;
  if (code) {
    const getTokenUrl = "https://api.instagram.com/oauth/access_token";

    const body = new FormData();
    body.append("client_id", process.env.NEXT_PUBLIC_INSTA_CLIENT_ID);
    body.append("client_secret", process.env.NEXT_PUBLIC_INSTA_CLIENT_SECRET);
    body.append("grant_type", "authorization_code");
    body.append("redirect_uri", "https://frienday.vercel.app/signup/getinsta");
    body.append("code", code);

    const res = await fetch(getTokenUrl, {
      method: "POST",
      headers: {},
      body: body,
    });

    const data = await res.json();
    const token = data.access_token;

    const profres = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${token}`
    );
    const profiledata = await profres.json();

    return {
      props: { profiledata: profiledata },
    };
  } else {
    return {
      props: { profiledata: "クエリなし" },
    };
  }
};

// クライアントサイド
export default function Login({ profiledata }) {
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();
  const getCodeUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTA_CLIENT_ID}&redirect_uri=https%3A%2F%2Ffrienday.vercel.app%2Fsignup%2Fgetinsta&scope=user_profile,user_media&response_type=code`;

  // if (currentUser) {
  //   router.push("/signup/setname");
  // }

  const handleLoginButton = async () => {
    await login();
    router.push("/signup/setname");
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
        <ul className={styles.process}>
          <li>1</li>
          <div className={styles.line}></div>
          <li>2</li>
          <div className={styles.line}></div>
          <li>3</li>
        </ul>
        <div className={styles.title}>
          <h1>{profiledata.username}</h1>
          <p>{profiledata.username}</p>
        </div>
        <div className={styles.actionBox}>
          <p>
            あなたのInstagramIDを取得しました。
            <br />
            次はGoogleアカウントでのログインです。
          </p>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.nextText}>
            <p>ログイン</p>
          </div>
          <button
            className={styles.nextArrow}
            onClick={() => handleLoginButton}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}
