import styles from "./FlowerLikeUs.module.scss";
import FlowerImg from "../common/FlowerImg";

const FlowerLikeUs = () => {
  return (
    <section className={styles.likeus_wrapper}>
      <h1 className={styles.likeus_title}>우리를 닮은 꽃</h1>
      <div className={styles.us_wrapper}>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <h1>강민성</h1>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <h1>박다빈</h1>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <h1>박수근</h1>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <h1>성유지</h1>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <h1>이민우</h1>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <h1>최수연</h1>
        </article>
      </div>
    </section>
  );
};

export default FlowerLikeUs;
