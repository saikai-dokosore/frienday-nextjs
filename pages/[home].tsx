import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import firebase, { db } from '../lib/firebaseInit'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { GetServerSideProps } from 'next'

// データ取得用の関数
const getData = async (users) => {
  let userId = '' // ユーザードキュメントID
  let userObj = {} // プロフィールオブジェクト
  let placeObj = {
    place: {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [],
      Oct: [],
      Nov: [],
      Dec: [],
    },
  } // 場所オブジェクト
  const getUserData = async (u) => {
    await u.forEach(async (user) => {
      userId = user.id
      userObj = user.data()
    })
  }
  const getPlaceData = async (p) => {
    p.forEach(async (place) => {
      placeObj.place[place.data().month].push({
        ...{ id: place.id },
        ...place.data(),
      })
    })
  }

  await getUserData(users)
  const places = await db.collection('users').doc(userId).collection('place').get()
  await getPlaceData(places)
  const userIdObj = { userId: userId }

  return { ...userIdObj, ...userObj, ...placeObj }
}

// サーバー上でレンダリング
export const getServerSideProps: GetStaticProps = async (context) => {
  const id = await context.params.home
  const users = await db.collection('users').where('id', '==', id).get()
  if (users.size === 0) {
    context.res.writeHead(302, { Location: '/404' })
    context.res.end()
  }
  const database = await getData(users)
  return {
    props: {
      id: id,
      database: database || 'undef',
    },
  }
}

// コンポーネント
export default function Home({ id, database }) {
  console.log(id + 'で検索をかけました')

  const [userData, setUserData] = useState(database) // ユーザープロフィール
  const [placeData, setPlaceData] = useState(database.place) // 行きたい場所
  const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const profileImg =
    'https://firebasestorage.googleapis.com/v0/b/frienday-test.appspot.com/o/profile_image.jpg?alt=media&token=7cab9838-52b3-409f-9dab-40dc1437e163'

  // いきたいところコンポーネント
  const PlaceSetBoxs = () => {
    let monthComps = {}
    for (let i = 0; i < 12; i++) {
      if (placeData[monthes[i]].length !== 0) {
        monthComps[monthes[i]] = placeData[monthes[i]].map((p, i) => {
          return (
            <li key={i} className={styles.placeSetBox}>
              <div className={styles.emoji}>{String.fromCodePoint(p?.emoji)}</div>
              <div className={styles.placeTextBox}>
                <div className={styles.name}>{p?.name}</div>
                <div className={styles.placeSetBtn}>
                  <button className={styles.placeGo}>いきたい！</button>
                  <button className={styles.placeDelete} onClick={() => deletePlace(p?.id)}>
                    削除
                  </button>
                </div>
              </div>
            </li>
          )
        })
      }
    }
    return (
      <div>
        <ul className={styles.placeCulumnBox}>{monthComps['Apr']}</ul>
      </div>
    )
  }

  // いきたい場所を追加
  const addPlace = async () => {
    const place = document.getElementById('addPlaceText').value
    const placeObj = {
      name: place,
      emoji: '0x1F37B',
    }
    if (place !== '') {
      await db.collection('users').doc(userData.userId).collection('place').add(placeObj)
      setPlaceData([...placeData, placeObj])
    }
    document.getElementById('addPlaceText').value = ''
  }

  // いきたい場所を削除
  const deletePlace = async (id) => {
    await db.collection('users').doc(userData.userId).collection('place').doc(id).delete()
    setPlaceData(
      placeData.filter((item) => {
        return item.id !== id
      })
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{userData.id}</title>
        <meta name="description" content={userData.id + 'を気軽に誘っちゃおう'} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="test" />
        <meta name="og:title" content="test" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ヘッダー */}
      <header className={styles.header}>
        <h1>FRIENDAY</h1>
        <Link href="/login">
          <a>login</a>
        </Link>
      </header>

      {/* アカウント */}
      <div className={styles.accountBox}>
        <div className={styles.accountImgBox + ' ' + styles[userData?.color]}>
          <Image src={profileImg} alt="Profile Picture" width={500} height={500} />
        </div>
        <div className={styles.accountTextBox}>
          <h3>{userData?.name}</h3>
          <p className={styles.accountTextJob}>{userData?.job}</p>
          <p className={styles.accountTextBio}>{userData?.bio}</p>
        </div>
      </div>

      {/* ポム */}
      <div className={styles.pomuBox}>
        <button>ポムられています</button>
        <button className={styles.enable}>ポムる</button>
      </div>

      {/* いきたい場所リスト */}
      <main className={styles.main}>
        <div className={styles.placeBox}>
          <PlaceSetBoxs />
        </div>
      </main>
    </div>
  )
}
