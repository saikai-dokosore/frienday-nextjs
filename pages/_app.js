import "../styles/globals.scss";
import "../styles/reset.scss";
import { useEffect } from "react";
import { useSetRecoilState, RecoilRoot } from "recoil";
import { currentUserState } from "../states/currentUser";

const fetchCurrentUser = () => {
  console.log("path : " + router.asPath);
  return "saikai_official";
};

function AppInit() {
  // グローバルステートにユーザー情報をセットするためのもの
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    (async function () {
      try {
        const { currentUser } = await fetchCurrentUser(); // サーバーへのリクエスト（未ログインの場合は401等を返すものとする）
        // ログインユーザーの情報が取得できたのでグローバルステートにセット
        setCurrentUser(currentUser);
      } catch {
        // 未ログイン（未ログイン時のリダイレクト処理などをここに書いても良いかも）
        setCurrentUser(null);
      }
    })();
  }, []);

  return null;
}

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    if (router.asPath === "/login") return;
    // ログイン処理
  }, [router.asPath]);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <AppInit />
    </RecoilRoot>
  );
}

export default MyApp;
