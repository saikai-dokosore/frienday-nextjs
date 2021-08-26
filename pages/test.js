import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: {
      id: id || "ok",
    },
  };
}

export default function Home({ id }) {
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

      <main className={styles.main}>サクサクページ{id}</main>
    </div>
  );
}
