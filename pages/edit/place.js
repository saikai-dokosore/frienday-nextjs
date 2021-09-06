import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/EditPlace.module.scss";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useState, useEffect } from "react";
import { MdKeyboardArrowRight, MdFileUpload } from "react-icons/md";

import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

export default function Index() {
  // Auth
  const { currentUser, userId, login, logout, getUserId } = useAuth();
  const router = useRouter();

  const [placeData, setPlaceData] = useState(); // 行きたい場所
  const [placeUls, setPlaceUls] = useState(<div></div>);
  const [newPlace, setNewPlace] = useState("");
  const [newMonth, setNewMonth] = useState("Apr");

  const monthEmoji = {
    Jan: "0x1F338",
    Feb: "0x1F338",
    Mar: "0x1F338",
    Apr: "0x1F338",
    May: "0x1F338",
    Jun: "0x1F40C",
    Jul: "0x1F338",
    Aug: "0x1F338",
    Sep: "0x1F338",
    Oct: "0x1F338",
    Nov: "0x1F338",
    Dec: "0x1F338",
  };

  useEffect(() => {
    if (!currentUser) {
      //router.push("/signup/welcome");
    }
  }, [currentUser, router]);

  const updateInfo = async () => {
    if (userId) {
      await db.collection("users").doc(userId).collection("place").add({
        emoji: "0x1F37B",
        month: newMonth,
        name: newPlace,
      });
    }
    alert("更新しました");
  };

  // Place
  useEffect(() => {
    let placeObj = {};
    if (userId) {
      (async () => {
        // DBから取得
        const places = await db
          .collection("users")
          .doc(userId)
          .collection("place")
          .get();
        // 予定がある月をキーとして予定を配列に入れる
        places.forEach(async (p) => {
          if (!placeObj[p.data().month]) {
            placeObj[p.data().month] = [];
          }
          placeObj[p.data().month].push({
            ...{ id: p.id },
            ...p.data(),
          });
        });
        setPlaceData(placeObj);
        // 各月ごとにコンポーネントの配列にする
        let ulComps = [];
        for (let i = 0; i < Object.keys(placeObj).length; i++) {
          let key = Object.keys(placeObj)[i];
          let comp = placeObj[key].map((p, i) => {
            return (
              <li key={i} className={styles.placeListBox}>
                <div className={styles.emoji}>
                  {String.fromCodePoint(p?.emoji)}
                </div>
                <div className={styles.placeTextBox}>
                  <input className={styles.name} value={p?.name} />
                </div>
                <div className={styles.placeBtnBox}>
                  <button
                    className={styles.placeGo}
                    onClick={() => goPlace(p?.id)}
                  >
                    いきたい！
                  </button>
                </div>
              </li>
            );
          });
          ulComps.push(
            <ul key={i} className={styles.placeUlBox + " " + styles[key]}>
              <h3>{String.fromCodePoint(monthEmoji[key]) + " " + key}</h3>
              {comp}
            </ul>
          );
        }
        ulComps.push(
          <div className={styles.addPlaceBox}>
            <select
              name="monthes"
              id="monthes"
              onChange={(event) => {
                setNewMonth(event.target.value);
              }}
            >
              <option value="Apr">April</option>
              <option value="May">May</option>
              <option value="Jun">June</option>
            </select>
            <input
              id="newPlace"
              type="text"
              value={newPlace}
              onChange={(event) => {
                setNewPlace(event.target.value);
              }}
            />
            <button
              onClick={() => {
                updateInfo();
              }}
            >
              追加
            </button>
          </div>
        );
        setPlaceUls(ulComps);
      })();
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <Head>
        <title>home</title>
        <meta name="description" content="test" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <div className={styles.headerBtnBox}>
          <Link href="/nortification">
            <a>
              <div className={styles.nortification}>
                <HiOutlineBell />
              </div>
            </a>
          </Link>
          <Link href="/setting">
            <a>
              <div className={styles.user}>
                <HiOutlineCog />
              </div>
            </a>
          </Link>
          <Link href={currentUser ? `/${userId}` : "/signup/welcome"}>
            <a>
              <div className={styles.user}>
                <HiOutlineUserCircle />
              </div>
            </a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>いきたい場所</h1>
          <p></p>
        </div>
        <div className={styles.actionBox}>
          <div className={styles.placeBox}>{placeUls}</div>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.nextText}>
            <p>更新</p>
          </div>
          <button className={styles.nextArrow} onClick={() => {}}>
            <MdKeyboardArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}
