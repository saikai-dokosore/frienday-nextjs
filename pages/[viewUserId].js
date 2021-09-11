import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/DesignIllust.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, storage } from "../lib/firebaseInit";
import { useAuth } from "../lib/auth";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineCog,
} from "react-icons/hi";

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
      viewUserId: params.viewUserId,
    },
    revalidate: 10, // 10秒間はキャッシュを更新しない
  };
};

// コンポーネント
export default function Index({ viewUserId }) {
  const [placeData, setPlaceData] = useState(); // 行きたい場所
  const [pomu, setPomu] = useState([]);
  const [isFollowYou, setIsFollowYou] = useState(false);
  const [followersNum, setFollowersNum] = useState(0);
  const [followNow, setFollowNow] = useState(true);
  const storageRef = storage.ref();
  const [placeUls, setPlaceUls] = useState(<div></div>);
  const { currentUser, userId, login, logout, getUserId } = useAuth();
  const [isMine, setIsMine] = useState(false);
  const [message, setMessage] = useState("");
  const [acctionBtnId, setAcctionBtnId] = useState("");
  const router = useRouter();
  const {
    name,
    job,
    bio,
    accountImgUrl,
    setName,
    setJob,
    setBio,
    setAccountInfo,
    setAccountImgUrl,
  } = useAuth();

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

  // マイページ判定
  useEffect(() => {
    setIsMine(userId === viewUserId ? true : false);
  }, [userId]);

  // // Place
  // useEffect(() => {
  //   let placeObj = {};
  //   (async () => {
  //     // DBから取得
  //     const places = await db
  //       .collection("users")
  //       .doc(id)
  //       .collection("place")
  //       .get();
  //     // 予定がある月をキーとして予定を配列に入れる
  //     places.forEach(async (p) => {
  //       if (!placeObj[p.data().month]) {
  //         placeObj[p.data().month] = [];
  //       }
  //       placeObj[p.data().month].push({
  //         ...{ id: p.id },
  //         ...p.data(),
  //       });
  //     });
  //     setPlaceData(placeObj);
  //     // 各月ごとにコンポーネントの配列にする
  //     let ulComps = [];
  //     for (let i = 0; i < Object.keys(placeObj).length; i++) {
  //       let key = Object.keys(placeObj)[i];
  //       let comp = placeObj[key].map((p, i) => {
  //         return (
  //           <li key={i} className={styles.placeListBox}>
  //             <div className={styles.emoji}>
  //               {String.fromCodePoint(p?.emoji)}
  //             </div>
  //             <div className={styles.placeTextBox}>
  //               <div className={styles.name}>{p?.name}</div>
  //             </div>
  //             <div className={styles.placeBtnBox}>
  //               <button
  //                 className={styles.placeGo}
  //                 onClick={() => goPlace(p?.id)}
  //               >
  //                 いきたい！
  //               </button>
  //             </div>
  //           </li>
  //         );
  //       });
  //       ulComps.push(
  //         <ul key={i} className={styles.placeUlBox + " " + styles[key]}>
  //           <h3>{String.fromCodePoint(monthEmoji[key]) + " " + key}</h3>
  //           {comp}
  //         </ul>
  //       );
  //     }
  //     setPlaceUls(ulComps);
  //   })();
  // }, [database]);

  // FollowersNomを取得
  useEffect(() => {
    (async () => {
      // DBから取得
      const followers = await db
        .collection("users")
        .doc(viewUserId)
        .collection("followers")
        .get();
      let num = 0;
      followers.forEach(async (p) => {
        if (p?.data()?.now) {
          num = num + 1;
        }
      });
      setFollowersNum(num);
    })();
  }, [userId]);

  // isFollowYouを取得
  useEffect(() => {
    (async () => {
      if (userId) {
        // DBから取得
        const followYou = await db
          .collection("users")
          .doc(viewUserId)
          .collection("follows")
          .doc(userId)
          .get();
        if (followYou?.data()?.now) {
          setIsFollowYou(true);
        } else {
          setIsFollowYou(false);
        }
      }
    })();
  }, [userId]);

  // followNowを取得
  useEffect(() => {
    (async () => {
      if (userId) {
        // DBから取得
        const follow = await db
          .collection("users")
          .doc(userId)
          .collection("follows")
          .doc(viewUserId)
          .get();
        if (follow?.data()?.now) {
          setFollowNow(true);
        } else {
          setFollowNow(false);
        }
      }
    })();
  }, [userId]);

  // ポムを押したときの挙動
  const acctionfollowNow = async () => {
    const now = !followNow;
    setFollowersNum(now ? followersNum + 1 : followersNum - 1);
    setFollowNow(now);
    await db
      .collection("users")
      .doc(userId)
      .collection("follows")
      .doc(viewUserId)
      .set({
        now: now,
      });
    await db
      .collection("users")
      .doc(viewUserId)
      .collection("followers")
      .doc(userId)
      .set({ now: now });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{viewUserId}</title>
        <meta
          name="description"
          content={viewUserId + "を気軽に誘っちゃおう"}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.coverBox}>
        <div className={styles.title}>
          <h1>Instago</h1>
        </div>
        <div className={styles.cover} id="cover"></div>
      </div>
      <div className={styles.prifileBox}>
        <div className={styles.image}>
          <Image
            src={"/images/illust/profile.png"}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.profile}>
          <p className={styles.name}>さいかい</p>
          <p className={styles.goodnum}>10Goods</p>
          <p className={styles.isgooded}>Goodされています</p>

          <button onClick={() => {}} className={styles.pomu}>
            Good
          </button>
        </div>
      </div>
    </div>
  );
}
