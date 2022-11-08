import styles from "./FlowerLikeUs.module.scss";
import FlowerImg from "../common/FlowerImg";

const FlowerLikeUs = () => {
  return (
    <section className={styles.likeus_wrapper}>
      <h1 className={styles.likeus_title}>우리를 닮은 꽃</h1>
      <div className={styles.us_wrapper}>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <p>강민성</p>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <p>박다빈</p>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <p>박수근</p>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <p>성유지</p>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <p>이민우</p>
        </article>
        <article className={styles.us_card}>
          <FlowerImg src="/custom/flower/blue_gypsophila.png" alt={"너닯꽃"} />
          <p>최수연</p>
        </article>
      </div>
    </section>
  );
};

export default FlowerLikeUs;
