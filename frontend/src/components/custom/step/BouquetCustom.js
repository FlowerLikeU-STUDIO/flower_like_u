import styles from "./BouquetCustom.module.scss";
import Link from "next/link";

const BuoquetCustom = () => {
  return (
    <>
      <div className={styles.text}>커스텀 페이지</div>
      <Link href="/custom/save">완성</Link>
    </>
  );
};

export default BuoquetCustom;
