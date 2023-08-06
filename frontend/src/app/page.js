import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          <Link href="/rooms/1">Chat Room 1</Link>
        </p>
        <p>
          <Link href="/rooms/2">Chat Room 2</Link>
        </p>
        <p>
          <Link href="/rooms/3">Chat Room 2</Link>
        </p>
      </div>
    </main>
  );
}
