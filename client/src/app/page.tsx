import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <Image
          width={32}
          height={32}
          src="/work_os_icon.png"
          alt="WorkOS Icon"
          className={styles.pagePlaceholderIcon}
        />
        <h1 className={styles.pageHeader}>
          WorkOS User Role Management - Under Development
        </h1>
      </div>
    </main>
  );
}
