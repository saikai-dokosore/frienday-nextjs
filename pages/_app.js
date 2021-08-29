import "../styles/globals.scss";
import "../styles/reset.scss";
import { useEffect } from "react";
import { useSetRecoilState, RecoilRoot } from "recoil";

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    if (router.asPath === "/login") return;
    // ログイン処理
  }, [router.asPath]);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
