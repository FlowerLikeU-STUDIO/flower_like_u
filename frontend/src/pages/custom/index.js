import styles from "./index.module.scss";
import Link from "next/link";

const Custom = () => {
  return (
    <main className={styles.testbox}>
      <Link href="/custom/package">커스텀 시작하기</Link>
    </main>
  );
};

export default Custom;
