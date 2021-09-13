import { createContext, useContext, useEffect, useState } from "react";
import firebase, { auth, db, storage } from "./firebaseInit";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [myInfo, setMyInfo] = useState(null); //ログインユーザー情報
  const [accountImgUrl, setAccountImgUrl] = useState("");
  const storageRef = storage.ref();

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

  const value = {
    myInfo,
    setMyInfo,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
