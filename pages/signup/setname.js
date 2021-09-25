import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/SignupSetname.module.scss";
import { useAuth } from "../../lib/auth";
import SignupHeader from "../../lib/signupHeader";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db, storage } from "../../lib/firebaseInit";

export default function Index() {
  const {
    myInfo,
    setMyInfo,
    login,
    logout,
    newAccount,
    setNewAccount,
    isLoggedIn,
    loginChecked,
  } = useAuth();
  const router = useRouter();

  const [colors, setColors] = useState([]);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    (async () => {
      if (loginChecked) {
        if (!isLoggedIn) {
          await login();
        } else {
          const user = await db.collection("users").doc(router.query.id).get();
          await db
            .collection("users")
            .doc(router.query.id)
            .set({ ...newAccount });
          setMyInfo({
            ...newAccount,
            ...{ id: router.query.id },
          });
          console.log(user.data());
          if (!user.data()) {
            const placeDb = await db
              .collection("users")
              .doc(router.query.id)
              .collection("places");
            placeDb.add({ name: "ディズニーランド", icon: "01" });
            placeDb.add({ name: "表参道カフェ", icon: "02" });
            placeDb.add({ name: "劇場版鬼滅の刃", icon: "03" });
          }
        }
      }
    })();
  }, [newAccount]);

  useEffect(() => {
    if (document.getElementById("name")) {
      document.getElementById("name").value = newAccount?.name;
    }
  }, []);

  let colorSets = ["red", "blue", "green", "yellow"];
  useEffect(() => {
    // color
    let _colors = [];
    for (let i = 0; i < 4; i++) {
      _colors.push(
        <button
          className={styles[colorSets[i]]}
          onClick={() => {
            setNewAccount({
              ...newAccount,
              ...{
                color: colorSets[i],
              },
            });
          }}
        ></button>
      );
    }
    setColors(_colors);
    // avatar
    let _avatars = [];
    for (let i = 1; i < 17; i++) {
      _avatars.push(
        <button
          className={styles.image}
          onClick={() => {
            setNewAccount({
              ...newAccount,
              ...{
                icon: ("00" + i).slice(-2),
              },
            });
          }}
        >
          <img src={`/images/avatars/${("00" + i).slice(-2)}.svg`} alt="" />
        </button>
      );
    }
    setAvatars(_avatars);
  }, [newAccount]);

  return (
    <div className={styles.container}>
      <Head>
        <title>ニックネーム</title>
        <meta name="description" content="設定" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {!isLoggedIn ? (
        <SignupHeader title={"Googleログイン"} enable={2} />
      ) : (
        <SignupHeader title={"アイコン作成"} enable={3} />
      )}

      <div className={styles.top}>
        <div className={styles.image + " " + styles[newAccount.color]}>
          <img src={`/images/avatars/${newAccount.icon}.svg`} alt="" />
        </div>
        {!isLoggedIn ? (
          <p className={styles.text}>ログイン中です...</p>
        ) : (
          <div></div>
        )}
      </div>

      {!isLoggedIn ? (
        <div></div>
      ) : (
        <div className={styles.contentBox}>
          <div className={styles.colorBox}>{colors}</div>
          <div className={styles.avatarBox}>{avatars}</div>
          <div className={styles.inputBox}>
            <input
              type="text"
              id="name"
              placeholder={"ニックネーム"}
              onChange={(event) => {
                setNewAccount({
                  ...newAccount,
                  ...{ name: event.target.value },
                });
              }}
            />
          </div>
          <div className={styles.btnBox}>
            <Link href={`/signup/newaccount?id=${router.query.id}`}>
              <a className={styles[newAccount.color]}>アカウント作成</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
