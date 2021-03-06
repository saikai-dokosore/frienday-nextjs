import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ViewUserId.module.scss";
import { useState, useEffect } from "react";
import { db } from "../lib/firebaseInit";
import { useAuth } from "../lib/auth";
import Header from "../lib/header";
import { MdEdit } from "react-icons/md";

export const getStaticPaths = async () => {
  const users = await db.collection("users").get(); // 全ユーザー取得
  let items = [];
  users.forEach(function (doc) {
    items.push(doc);
  });
  // useridのパスを生成
  const paths = items.map((item) => ({
    params: {
      viewUserId: item.id,
    },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }) => {
  const user = await db.collection("users").doc(params.viewUserId).get();
  // 作成されていないPathなら404へリダイレクト
  if (!user.data()) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {
      viewUserInfo: {
        id: params.viewUserId,
        name: user.data().name,
        icon: user.data().icon,
        color: user.data().color,
      },
    },
    revalidate: 5, // 5秒間はキャッシュを更新しない
  };
};

// コンポーネント
export default function Index({ viewUserInfo }) {
  const {
    isMine,
    setIsMine,
    myInfo,
    setMyInfo,
    myPlaces,
    setMyPlaces,
    login,
    logout,
  } = useAuth();
  const [isFollowYou, setIsFollowYou] = useState(false);
  const [youGoods, setYouGoods] = useState(0);
  const [totalGoods, setTotalGoods] = useState(0);
  const [placeCards, setPlaceCards] = useState(<div></div>);

  // マイページ判定
  useEffect(() => {
    if (myInfo) {
      setIsMine(myInfo.id === viewUserInfo?.id ? true : false);
    }
    console.log("myInfo", myInfo);
  }, [myInfo]);

  // Total You を取得
  useEffect(() => {
    (async () => {
      // Total
      const total = await db
        .collection("users")
        .doc(viewUserInfo?.id)
        .collection("followers")
        .get();
      let num = 0;
      total.forEach(async (p) => {
        if (p?.data()?.num) {
          num = num + p?.data()?.num;
        }
      });
      setTotalGoods(num);

      // You
      if (myInfo?.id) {
        const you = await db
          .collection("users")
          .doc(viewUserInfo?.id)
          .collection("followers")
          .doc(myInfo?.id)
          .get();
        if (you?.data()?.num > 0) {
          setYouGoods(you?.data()?.num);
        }
      }
    })();
  }, [viewUserInfo?.id, myInfo?.id]);

  // あなたをGoodしています
  useEffect(() => {
    (async () => {
      if (myInfo) {
        // DBから取得
        const followYou = await db
          .collection("users")
          .doc(viewUserInfo?.id)
          .collection("follows")
          .doc(myInfo.id)
          .get();
        if (followYou?.data()) {
          setIsFollowYou(true);
        } else {
          setIsFollowYou(false);
        }
      }
    })();
  }, [myInfo]);

  // Goodを押したときの挙動
  const pushGood = async () => {
    if (myInfo) {
      setYouGoods(youGoods + 1);
      setTotalGoods(totalGoods + 1);
    } else {
      alert("ぜひアカウント作成してください！");
    }
  };

  // Youが変化したときにDBに反映する
  useEffect(() => {
    if (myInfo && youGoods > 0) {
      (async () => {
        await db
          .collection("users")
          .doc(myInfo.id)
          .collection("follows")
          .doc(viewUserInfo?.id)
          .set({ num: youGoods });
        await db
          .collection("users")
          .doc(viewUserInfo?.id)
          .collection("followers")
          .doc(myInfo.id)
          .set({ num: youGoods });
      })();
    }
  }, [youGoods]);

  // 行きたい場所リストの取得
  useEffect(() => {
    (async () => {
      if (!isMine) {
        let _placeCards = [];
        const places = await db
          .collection("users")
          .doc(viewUserInfo?.id)
          .collection("places")
          .get();
        places.forEach(async (p) => {
          _placeCards.push(
            <Link href={`/place/details?id=${viewUserInfo?.id}&key=${p.id}`}>
              <a>
                <div className={styles.placeCard}>
                  <div className={styles.image}>
                    <Image
                      src={`/images/avatars/${p.data().icon}.svg`}
                      alt="場所カード"
                      width={200}
                      height={200}
                      quality={100}
                    />
                  </div>
                  <div className={styles.hashtag}>
                    <p>#{p.data().name}</p>
                  </div>
                </div>
              </a>
            </Link>
          );
        });
        setPlaceCards(<div className={styles.placeCardBox}>{_placeCards}</div>);
      }
    })();
  }, [isMine]);

  // isMineの場合
  useEffect(() => {
    (async () => {
      if (isMine && myPlaces) {
        let _placeCards = [];

        const keys = Object.keys(myPlaces);
        for (let i = 0; i < keys.length; i++) {
          _placeCards.push(
            <div className={styles.editCardBox}>
              <Link href={`/edit/place?id=${keys[i]}`}>
                <a className={styles.edit}>
                  <MdEdit />
                </a>
              </Link>
              <Link
                href={`/place/details?id=${viewUserInfo?.id}&key=${keys[i]}`}
              >
                <a>
                  <div className={styles.placeCard}>
                    <div className={styles.image}>
                      <Image
                        src={`/images/avatars/${myPlaces[keys[i]].icon}.svg`}
                        alt="場所カード"
                        width={200}
                        height={200}
                        quality={100}
                      />
                    </div>
                    <div className={styles.hashtag}>
                      <p>#{myPlaces[keys[i]].name}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        }
        setPlaceCards(<div className={styles.placeCardBox}>{_placeCards}</div>);
      }
    })();
  }, [myPlaces, isMine]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{viewUserInfo?.id}</title>
        <meta
          name="description"
          content={viewUserInfo?.id + "を気軽に誘っちゃおう"}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header back={false} />

      <div className={styles.profileBox}>
        <div className={styles.profileTop}>
          <div className={styles.total}>
            <p className={styles.num}>{totalGoods}</p>
            <p>Total</p>
          </div>
          <div
            className={
              styles.image +
              " " +
              styles[isMine ? myInfo?.color : viewUserInfo?.color]
            }
          >
            <img
              src={`/images/avatars/${viewUserInfo?.icon}.svg`}
              width={1000}
              alt=""
            />
          </div>
          <div className={styles.you}>
            <p className={styles.num}>{youGoods}</p>
            <p>You</p>
          </div>
        </div>
        <p className={styles.name}>
          {isMine ? myInfo?.name : viewUserInfo?.name}
        </p>
        {isFollowYou ? (
          <p className={styles.isGooded}>あなたをGoodしています</p>
        ) : (
          <div></div>
        )}
        {isMine ? (
          <Link href={"/edit/account"}>
            <div className={styles.edit}>
              <a>プロフィール編集</a>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {isMine ? (
          <div></div>
        ) : (
          <div className={styles.goodBtnBox}>
            <button
              onClick={() => {
                pushGood();
              }}
              className={
                styles.goodBtn +
                " " +
                styles[isMine ? myInfo?.color : viewUserInfo?.color]
              }
            >
              Good
            </button>
          </div>
        )}
      </div>

      <div className={styles.placeTitle}>
        <h3>今月気になっているところ</h3>
      </div>
      <div className={styles.placeBox}>{placeCards}</div>

      {isMine ? (
        <div className={styles.addBtnBox}>
          <Link href={"/edit/place"}>
            <a
              onClick={() => {}}
              className={styles.addBtn + " " + styles[myInfo?.color]}
            >
              場所を追加
            </a>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
