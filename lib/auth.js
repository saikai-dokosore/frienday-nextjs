import { createContext, useContext, useEffect, useState } from "react";
import firebase, { auth, db, storage } from "./firebaseInit";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");
  const [accountImgUrl, setAccountImgUrl] = useState("");
  const storageRef = storage.ref();

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

  const setAccountInfo = async () => {
    if (userId) {
      await db.collection("users").doc(userId).update({
        name: name,
        job: job,
        bio: bio,
      });
    }
    setName(name);
    setJob(job);
    setBio(bio);
  };

  // ProfileImg
  useEffect(() => {
    (async () => {
      try {
        const profileImg = await storageRef
          .child(`images/${userId}.jpg`)
          .getDownloadURL();
        setAccountImgUrl(profileImg);
      } catch (err) {
        console.log("画像がありません");
      }
    })();
  }, [userId]);

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
    name,
    job,
    bio,
    setName,
    setJob,
    setBio,
    setAccountInfo,
    accountImgUrl,
    setAccountImgUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
