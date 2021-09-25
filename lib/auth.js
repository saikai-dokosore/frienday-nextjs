import { createContext, useContext, useEffect, useState } from "react";
import firebase, { auth, db } from "./firebaseInit";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [myInfo, setMyInfo] = useState(null); //ログインユーザー情報
  const [myPlaces, setMyPlaces] = useState(null);
  const [isMine, setIsMine] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "名無しさん",
    email: "",
    icon: "01",
    color: "blue",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);

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
        setIsLoggedIn(true);
        setLoginChecked(true);
        // 一つのemailで複数のアカウントがあるかもしれないことを考慮しないといけない
        let _myInfo = [];
        const me = await db
          .collection("users")
          .where("email", "==", user.email)
          .get();
        if (me.size !== 0) {
          me.forEach(function (u) {
            _myInfo.push(u);
          });
          setMyInfo({
            id: _myInfo[0].id,
            name: _myInfo[0].data().name,
            email: _myInfo[0].data().email,
            icon: _myInfo[0].data().icon,
            color: _myInfo[0].data().color,
          });
        } else {
          setNewAccount({ ...newAccount, ...{ email: user.email } });
        }
      } else {
        setIsLoggedIn(false);
        setLoginChecked(true);
      }
    });
  }, []);

  // 自分の場所リストを作成
  useEffect(() => {
    (async () => {
      let _myPlaces = {};
      if (myInfo) {
        const places = await db
          .collection("users")
          .doc(myInfo.id)
          .collection("places")
          .get();
        places.forEach(async (p) => {
          _myPlaces[p.id] = { name: p.data().name, icon: p.data().icon };
        });
        setMyPlaces(_myPlaces);
      }
    })();
  }, [myInfo]);

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
    isMine,
    setIsMine,
    myInfo,
    setMyInfo,
    login,
    logout,
    myPlaces,
    setMyPlaces,
    newAccount,
    setNewAccount,
    isLoggedIn,
    loginChecked,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
