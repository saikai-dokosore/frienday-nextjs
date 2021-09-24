import Link from "next/link";
import headerStyles from "../styles/Header.module.scss";
import { db } from "../lib/firebaseInit";
import { useAuth } from "../lib/auth";
import { HiBell, HiOutlineBell } from "react-icons/hi";
import { FiThumbsUp, FiUser } from "react-icons/fi";
import { IoSettingsOutline, IoChevronBackSharp } from "react-icons/io5";

// コンポーネント
export default function Header(props) {
  const { myInfo } = useAuth();

  return (
    <header className={headerStyles.header}>
      {props.back ? (
        <div className={headerStyles.backBtnBox}>
          <Link href={props?.backto ? `/${props.backto}` : `/${myInfo?.id}`}>
            <a>
              <IoChevronBackSharp />
              <p>Back</p>
            </a>
          </Link>
        </div>
      ) : (
        <h1>Instago</h1>
      )}
      {myInfo ? (
        <div>
          <div
            className={headerStyles.icon}
            onClick={() => {
              document.getElementById("menu").style.display = "block";
            }}
          >
            <img src={`/images/avatars/${myInfo?.icon}.svg`} alt="" />
            <div className={headerStyles.chat}>
              <HiBell />
            </div>
          </div>
          <div id="menu" className={headerStyles.menu}>
            <div className={headerStyles.menuContent}>
              <div className={headerStyles.profileBox}>
                <div
                  className={
                    headerStyles.image + " " + headerStyles[myInfo?.color]
                  }
                >
                  <img src={`/images/avatars/${myInfo?.icon}.svg`} alt="" />
                </div>
                <p className={headerStyles.name}>{myInfo?.name}</p>
                <p className={headerStyles.id}>{myInfo?.id}</p>
              </div>
              <Link href={"/user/nortification"}>
                <div className={headerStyles.items}>
                  <a>
                    <HiBell className={headerStyles.enable} />
                    <p>通知一覧</p>
                  </a>
                </div>
              </Link>
              <Link href={"/user/goods"}>
                <div className={headerStyles.items}>
                  <a>
                    <FiThumbsUp />
                    <p>Good一覧</p>
                  </a>
                </div>
              </Link>
              <Link href={`/${myInfo?.id}`}>
                <div className={headerStyles.items}>
                  <a>
                    <FiUser />
                    <p>マイページ編集</p>
                  </a>
                </div>
              </Link>
              <Link href={"/user/setting"}>
                <div className={headerStyles.items}>
                  <a>
                    <IoSettingsOutline />
                    <p>設定</p>
                  </a>
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
