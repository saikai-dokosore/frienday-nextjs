import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const addPlace = async () => {
    const place = document.getElementById("addPlaceText").value;
    const placeObj = {
      name: place,
      emoji: "0x1F37B",
    };
    if (place !== "") {
      await db
        .collection("users")
        .doc(userData.userId)
        .collection("place")
        .add(placeObj);
      setPlaceData([...placeData, placeObj]);
    }
    document.getElementById("addPlaceText").value = "";
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>sakusaku</title>
        <meta name="description" content={"test" + "を気軽に誘っちゃおう"} />
        <link rel="icon" href="/favicon.ico" />
        {/* ここでOGPも設定したい */}
      </Head>

      <header className={styles.header}>
        <h1>SAKUSAKU</h1>
        <Link href="/saikai_official">
          <a>saikai_official</a>
        </Link>
      </header>

      <main className={styles.main}>サクサクページ</main>
    </div>
  );
}
