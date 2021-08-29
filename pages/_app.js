import "../styles/globals.scss";
import "../styles/reset.scss";
import { useEffect } from "react";
import { useSetRecoilState, RecoilRoot } from "recoil";
import AuthProvider from "../lib/auth";

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    if (router.asPath === "/login") return;
    // ログイン処理
  }, [router.asPath]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
