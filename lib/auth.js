import { createContext, useContext, useEffect, useState } from "react";
import firebase, { auth } from "../lib/firebaseInit";
import styles from "../styles/Signup.module.scss";
import Head from "next/head";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithRedirect(provider);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  const loadingPage = (
    <div className={styles.container}>
      <Head>
        <title>ロード中</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.main}>ロード中です</main>
    </div>
  );

  return (
    <AuthContext.Provider value={value}>
      {loading ? loadingPage : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
