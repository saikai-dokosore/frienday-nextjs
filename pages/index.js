import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.scss";
import { useAuth } from "../lib/auth";

export default function Index() {
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
        <Link href="/admin/designtest">
          <a>designtest</a>
        </Link>
      </header>
      <main className={styles.main}>
        <h1>Frienday</h1>
      </main>
    </div>
  );
}
