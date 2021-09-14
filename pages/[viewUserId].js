import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ViewUserId.module.scss";
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
  const { myInfo, setMyInfo } = useAuth(); // ログインユーザー情報
  const [placeData, setPlaceData] = useState(); // 行きたい場所
  const [pomu, setPomu] = useState([]);
  const [isFollowYou, setIsFollowYou] = useState(false);
  const [followersNum, setFollowersNum] = useState(0);
  const [followNow, setFollowNow] = useState(true);
  const storageRef = storage.ref();
  const [placeUls, setPlaceUls] = useState(<div></div>);
  const [isMine, setIsMine] = useState(false);
  const [message, setMessage] = useState("");
  const [acctionBtnId, setAcctionBtnId] = useState("");
  const router = useRouter();

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
    if (myInfo) {
      setIsMine(myInfo.id === viewUserId ? true : false);
    }
  }, [myInfo]);

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
  }, [viewUserId]);

  // isFollowYouを取得
  useEffect(() => {
    (async () => {
      if (myInfo) {
        // DBから取得
        const followYou = await db
          .collection("users")
          .doc(viewUserId)
          .collection("follows")
          .doc(myInfo.id)
          .get();
        if (followYou?.data()?.now) {
          setIsFollowYou(true);
        } else {
          setIsFollowYou(false);
        }
      }
    })();
  }, [myInfo]);

  // followNowを取得
  useEffect(() => {
    (async () => {
      if (myInfo) {
        // DBから取得
        const follow = await db
          .collection("users")
          .doc(myInfo.id)
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
  }, [myInfo]);

  // ポムを押したときの挙動
  const acctionfollowNow = async () => {
    if (myInfo) {
      const now = !followNow;
      setFollowersNum(now ? followersNum + 1 : followersNum - 1);
      setFollowNow(now);
      await db
        .collection("users")
        .doc(myInfo.id)
        .collection("follows")
        .doc(viewUserId)
        .set({
          now: now,
        });
      await db
        .collection("users")
        .doc(viewUserId)
        .collection("followers")
        .doc(myInfo.id)
        .set({ now: now });
    } else {
      alert("ログインできていません");
    }
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

      <header className={styles.header}>
        <h1>Instago</h1>
      </header>

      <div className={styles.profileBox}>
        <div className={styles.profile}>
          <div className={styles.image}>
            <Image
              src={"/images/profiles/profile_illust.png"}
              alt="Profile Picture"
              width={95}
              height={95}
            />
          </div>
          <p className={styles.name}>maki kataoka</p>
          <p className={styles.isGooded}>あなたをGoodしています</p>
        </div>
        <div className={styles.goodBox}>
          <div className={styles.goodNum}>
            <div className={styles.total}>
              <p className={styles.num}>240</p>
              <p>Total</p>
            </div>
            <div className={styles.you}>
              <p className={styles.num}>0</p>
              <p>You</p>
            </div>
          </div>
          <button onClick={() => {}} className={styles.goodBtn}>
            Good
          </button>
        </div>
      </div>

      <div className={styles.placeTitle}>
        <h3>\ 9月の気になる場所 /</h3>
      </div>
      <div className={styles.placeCardBox}>
        <div className={styles.placeCard}>
          <div className={styles.image}>
            <Image
              src={"/images/avatar/peep-1.svg"}
              alt="Profile Picture"
              width={160}
              height={160}
            />
          </div>
          <div className={styles.hashtag}>
            <p>#表参道カフェ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
