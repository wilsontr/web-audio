import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a href="/sinewave">sine wave</a>
      </div>
    </main>
  );
}
