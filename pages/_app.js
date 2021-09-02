import "../styles/globals.scss";
import "../styles/reset.scss";
import { useEffect } from "react";
import { useSetRecoilState, RecoilRoot } from "recoil";
import AuthProvider from "../lib/auth";

function MyApp({ Component, pageProps, router }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
