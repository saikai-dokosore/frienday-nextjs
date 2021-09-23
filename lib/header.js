import Link from "next/link";
import headerStyles from "../styles/Header.module.scss";
import { db } from "../lib/firebaseInit";
import { useAuth } from "../lib/auth";
import { HiBell } from "react-icons/hi";

// コンポーネント
export default function Header() {
  const {
    myInfo,
    setMyInfo,
    profileImg,
    setProfileImg,
    placeCards,
    setPlaceCards,
    profileColor,
    setProfileColor,
    login,
    logout,
  } = useAuth();

  return (
    <header className={headerStyles.header}>
      <h1>Instago</h1>
      {myInfo ? (
        <div>
          <div
            className={headerStyles.icon}
            onClick={() => {
              document.getElementById("menu").style.display = "block";
            }}
          >
            {profileImg}
            <div className={headerStyles.chat}>
              <HiBell />
            </div>
          </div>
          <div id="menu" className={headerStyles.menu}>
            <div className={headerStyles.menuContent}>
              <Link href={"/user/nortification"}>
                <div className={headerStyles.items}>
                  <a>通知一覧</a>
                </div>
              </Link>
              <Link href={"/user/goods"}>
                <div className={headerStyles.items}>
                  <a>Good一覧</a>
                </div>
              </Link>
              <Link href={`/${myInfo?.id}`}>
                <div className={headerStyles.items}>
                  <a>マイページ編集</a>
                </div>
              </Link>
              <Link href={"/user/setting"}>
                <div className={headerStyles.items}>
                  <a>設定</a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Link href={"/signup/welcome"}>
          <div className={headerStyles.makeAccount}>
            <a>アカウント作成</a>
          </div>
        </Link>
      )}
    </header>
  );
}
