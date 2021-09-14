import { createContext, useContext, useEffect, useState } from "react";
import firebase, { auth, db, storage } from "./firebaseInit";
import styles from "../styles/ViewUserId.module.scss";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [myInfo, setMyInfo] = useState(null); //ログインユーザー情報
  const [accountImgUrl, setAccountImgUrl] = useState("");
  const storageRef = storage.ref();

  const [profileColor, setProfileColor] = useState("blue");
  const [profileImg, setProfileImg] = useState(<div></div>);
  const [placeCards, setPlaceCards] = useState(<div></div>);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithRedirect(provider);
  };

  const logout = () => {
    setMyInfo(null);
    return auth.signOut();
  };

  // // ProfileImg
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const profileImg = await storageRef
  //         .child(`images/${myId}.jpg`)
  //         .getDownloadURL();
  //       setAccountImgUrl(profileImg);
  //     } catch (err) {
  //       console.log("画像がありません");
  //     }
  //   })();
  // }, [myId]);

  // ログインしている場合にmyInfoを保存
  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        // 一つのemailで複数のアカウントがあるかもしれないことを考慮しないといけない
        let _myInfo = [];
        const myInfo = await db
          .collection("users")
          .where("email", "==", user.email)
          .get();
        myInfo.forEach(function (u) {
          _myInfo.push(u);
        });
        setMyInfo({
          id: _myInfo[0].id,
          name: _myInfo[0].data().name,
          email: _myInfo[0].data().email,
        });
      }
    });
  }, []);

  // プロフィール画像の取得
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 104) + 1;
    setProfileImg(<img src={`/images/avatar/peep-${randomNum}.svg`} alt="" />);
  }, []);

  const value = {
    myInfo,
    setMyInfo,
    login,
    logout,
    placeCards,
    setPlaceCards,
    profileColor,
    setProfileColor,
    profileImg,
    setProfileImg,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
