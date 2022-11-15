import styles from "./FlowerLikeUs.module.scss";
import FlowerImg from "../common/FlowerImg";

const FlowerLikeUs = () => {
  return (
    <section className={styles.likeus_wrapper}>
      <h1 className={styles.likeus_title}>너를 닮은 커스텀 꽃</h1>
      <div className={styles.us_wrapper}>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <span className={styles.title}>강민성</span>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <span className={styles.title}>박다빈</span>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <span className={styles.title}>박수근</span>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <span className={styles.title}>성유지</span>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <span className={styles.title}>이민우</span>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <span className={styles.title}>최수연</span>
        </article>
      </div>
    </section>
  );
};

export default FlowerLikeUs;
