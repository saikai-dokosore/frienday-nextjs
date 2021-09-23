import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Test.module.scss";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebaseInit";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";

export default function Index() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    (async () => {
      const users = await db.collection("users").get();
      let _userList = [];
      users.forEach(async (user) => {
        _userList.push(
          <Link href={`/${user.id}`}>
            <a>{user.data().name}</a>
          </Link>
        );
      });
      setUserList(_userList);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>管理者ページ</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.admin}>
        <h1>DEMO PAGE</h1>
        <div>
          <p>テストユーザー</p>
          {userList}

          <p>参考</p>
          <Link href="https://vsco.co/saikai0011">
            <a>VSCO</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
