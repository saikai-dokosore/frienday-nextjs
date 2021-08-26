import { useRecoilValue } from "recoil";
import { currentUserState } from "../states/currentUser";

export function useCurrentUser() {
  const currentUser = useRecoilValue(currentUserState); // グローバルステートからcurrentUserを取り出す
  const isAuthChecking = currentUser === undefined; // ログイン情報を取得中かどうか

  return {
    currentUser,
    isAuthChecking,
  };
}
