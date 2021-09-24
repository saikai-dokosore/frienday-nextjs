import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/EditPlace.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../../lib/firebaseInit";
import { useAuth } from "../../lib/auth";
import Header from "../../lib/header";

// コンポーネント
export default function Index() {
  const router = useRouter();
  const { myInfo, setMyInfo, myPlaces, setMyPlaces } = useAuth();
  const [avatars, setAvatars] = useState([]);
  const [placeKey, setPlaceKey] = useState("");
  const [placeInfo, setPlaceInfo] = useState({ name: "", icon: "" });

  const defaultsPlaces = ["ディズニーランド", "カフェ", "映画", "ドライブ"];

  useEffect(() => {});

  // 編集なのか新規なのかを取得、キーを設定
  useEffect(() => {
    (async () => {
      // 新規作成（キーなし）
      if (!router.query.id) {
        const randomPlace =
          defaultsPlaces[Math.floor(Math.random() * defaultsPlaces.length)];
        setPlaceInfo({
          name: randomPlace,
          icon: "01",
        });
        document.getElementById("name").value = randomPlace;
        // 編集（キーあり）
      } else {
        setPlaceKey(router.query.id);
        setPlaceInfo({
          name: myPlaces?.[router.query.id]?.name,
          icon: myPlaces?.[router.query.id]?.icon,
        });
        document.getElementById("name").value =
          myPlaces?.[router.query.id]?.name;
      }
    })();
  }, []);

  console.log("placeInfo", placeInfo.name, placeInfo.icon);

  // キーが設定されたらアバターにも反映
  useEffect(() => {
    // avatar
    let _avatars = [];
    for (let i = 1; i < 17; i++) {
      _avatars.push(
        <button
          className={styles.image}
          onClick={() => {
            avatarBtn(i);
          }}
        >
          <img src={`/images/avatars/${("00" + i).slice(-2)}.svg`} alt="" />
        </button>
      );
    }
    setAvatars(_avatars);
  }, [placeKey]);

  const avatarBtn = (i) => {
    setPlaceInfo({
      name: document.getElementById("name").value,
      icon: ("00" + i).slice(-2),
    });
    if (router.query.id) {
      setMyPlaces({
        ...myPlaces,
        ...{
          [router.query.id]: {
            name: myPlaces?.[router.query.id]?.name,
            icon: ("00" + i).slice(-2),
          },
        },
      });
      placeUpdate(
        router.query.id,
        myPlaces?.[router.query.id]?.name,
        ("00" + i).slice(-2)
      );
    }
  };

  // 場所を削除
  const deletePlace = async () => {
    await db
      .collection("users")
      .doc(myInfo?.id)
      .collection("places")
      .doc(placeKey)
      .delete();
    delete myPlaces?.[placeKey];
    router.push(`/${myInfo?.id}`);
  };

  // placeのDBを新規作成
  const addPlace = async () => {
    await db.collection("users").doc(myInfo?.id).collection("places").add({
      name: placeInfo.name,
      icon: placeInfo.icon,
    });
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
    router.push(`/edit/newpost?name=${placeInfo.name}&icon=${placeInfo.icon}`);
  };

  // placeのDBを更新する
  const placeUpdate = async (key, name, icon) => {
    if (myInfo) {
      await db
        .collection("users")
        .doc(myInfo?.id)
        .collection("places")
        .doc(key)
        .set({
          name: name,
          icon: icon,
        });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>アカウント編集</title>
        <meta name="description" content="アカウント編集画面" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <div className={styles.backBtnBox}>
        <Link href={`/${myInfo?.id}`}>
          <a>Back</a>
        </Link>
      </div>

      <div className={styles.placeCardBox}>
        <div className={styles.placeCard}>
          <div className={styles.image}>
            <Image
              src={`/images/avatars/${placeInfo.icon}.svg`}
              alt="場所カード"
              width="160"
              height="160"
            />
          </div>
          <div className={styles.hashtag}>
            <p>#{placeInfo.name}</p>
          </div>
        </div>
        <div className={styles.avatarBox}>{avatars}</div>
        <div className={styles.name}>
          <input
            id="name"
            onChange={(event) => {
              setPlaceInfo({
                ...placeInfo,
                ...{ name: event.target.value },
              });
              if (router.query.id) {
                setMyPlaces({
                  ...myPlaces,
                  ...{
                    [router.query.id]: {
                      name: event.target.value,
                      icon: myPlaces?.[router.query.id]?.icon,
                    },
                  },
                });
                placeUpdate(
                  router.query.id,
                  event.target.value,
                  myPlaces?.[router.query.id]?.icon
                );
              }
            }}
          />
        </div>

        <div className={styles.btnBox}>
          <button
            className={styles.delete}
            onClick={() => {
              deletePlace();
            }}
          >
            このカードを削除
          </button>
          {router.query.id ? (
            <Link
              href={`/edit/newpost?name=${placeInfo.name}&icon=${placeInfo.icon}`}
            >
              <a className={styles.ok + " " + styles[myInfo?.color]}>更新</a>
            </Link>
          ) : (
            <button
              className={styles.ok + " " + styles[myInfo?.color]}
              onClick={() => {
                addPlace();
              }}
            >
              作成
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
