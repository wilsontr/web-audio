import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.pageHeader}>web audio api test modules</h1>
      <div className={styles.description}>
        <a href="/sinewave">sine wave</a>
        <a href="/drunk-walk">drunk walk</a>
      </div>
    </main>
  );
}
