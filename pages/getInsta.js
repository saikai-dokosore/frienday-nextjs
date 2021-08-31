import Head from "next/head";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";

// サーバー上でレンダリング
export const getServerSideProps = async (context) => {
  const code = await context.query?.code;
  if (code) {
    // おそらくこの下でエラーになっている
    const getTokenUrl = "https://api.instagram.com/oauth/access_token";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const body = new FormData();
    body.append("client_id", "2664074760562135");
    body.append("client_secret", "2d6aeaad397af94c0e3fef1a72fc78f5");
    body.append("grant_type", "authorization_code");
    body.append("redirect_url", "https://frienday.vercel.app/getInsta");
    body.append("code", code);

    const res = await fetch(getTokenUrl, {
      method,
      headers,
      body,
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

export default function Login({ profiledata }) {
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();
  const getCodeUrl =
    "https://api.instagram.com/oauth/authorize?client_id=2664074760562135&redirect_uri=https%3A%2F%2Ffrienday.vercel.app%2FgetInsta&scope=user_profile,user_media&response_type=code";

  const handleLogoutButton = () => {
    logout();
  };
  console.log(profiledata);

  if (!currentUser) {
    router.push("/login");
  }

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
        <h1>インスタアカウントとの連携でサービスを利用できます！</h1>
        <a href={getCodeUrl}>
          <button>インスタ連携</button>
        </a>
        <button onClick={handleLogoutButton}>ログアウト</button>
      </main>
    </div>
  );
}
