import { createContext, useContext, useEffect, useState } from "react";
import firebase, { auth, db } from "./firebaseInit";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [myInfo, setMyInfo] = useState(null); //ログインユーザー情報
  const [placeCards, setPlaceCards] = useState(<div></div>);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithRedirect(provider);
  };

  const logout = () => {
    setMyInfo(null);
    return auth.signOut();
  };

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
          icon: _myInfo[0].data().icon,
          color: _myInfo[0].data().color,
        });
      }
    });
  }, []);

  // ユーザー情報を更新したときのDB更新
  useEffect(() => {
    (async () => {
      if (myInfo) {
        await db.collection("users").doc(myInfo?.id).set({
          name: myInfo.name,
          email: myInfo.email,
          icon: myInfo.icon,
          color: myInfo.color,
        });
      }
    })();
  }, [myInfo]);

  const value = {
    myInfo,
    setMyInfo,
    login,
    logout,
    placeCards,
    setPlaceCards,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
