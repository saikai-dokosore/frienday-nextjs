import { createContext, useContext, useEffect, useState } from "react";
import firebase, { auth, db } from "../lib/firebaseInit";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithRedirect(provider);
  };

  const logout = () => {
    setUserId(null);
    return auth.signOut();
  };

  const getUserId = (id) => {
    setUserId(id);
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // 一つのemailで複数のアカウントがあるかもしれないことを考慮する
    (async () => {
      if (currentUser) {
        let items = [];
        const user = await db
          .collection("users")
          .where("email", "==", currentUser.email)
          .get();
        user.forEach(function (u) {
          items.push(u);
        });
        setUserId(items[0].id);
      }
    })();
  }, [currentUser]);

  const value = {
    currentUser,
    userId,
    login,
    logout,
    getUserId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
