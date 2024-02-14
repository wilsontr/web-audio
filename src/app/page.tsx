import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.pageHeader}>web audio kit test modules</h1>
      <div className={styles.description}>
        <a href="/sinewave">sine wave</a>
      </div>
    </main>
  );
}
