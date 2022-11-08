import styles from "./PopularFlorist.module.scss";
import FlowerImg from "../common/FlowerImg";

const PopularFlorist = () => {
  return (
    <section className={styles.popular_wrapper}>
      <h1 className={styles.popular_title}>인기 플로리스트</h1>
      <div className={styles.florist_wrapper}>
        <article className={styles.florist_card}>
          <div className={styles.card_img}>
            <FlowerImg src="/auth/floristDefaultProfile.png" alt={"너닯꽃"} />
          </div>
          <h1 className={styles.florist_name}>꽃풍선 장인</h1>
          <h2 className={styles.florist_address}>대전광역시 구암동 678-2 어울림</h2>
        </article>
        <article className={styles.florist_card}>
          <div className={styles.card_img}>
            <FlowerImg src="/home/3.png" alt={"너닯꽃"} />
          </div>
          <h1 className={styles.florist_name}>싸피꽃집</h1>
          <h2 className={styles.florist_address}>대전광역시 유성구 동서대로 98-39</h2>
        </article>
        <article className={styles.florist_card}>
          <div className={styles.card_img}>
            <FlowerImg src="/home/9.png" alt={"너닯꽃"} />
          </div>
          <h1 className={styles.florist_name}>고래꽃집</h1>
          <h2 className={styles.florist_address}>울산광역시 남구 옥동 은월로 2번길</h2>
        </article>
        <article className={styles.florist_card}>
          <div className={styles.card_img}>
            <FlowerImg src="/home/5.png" alt={"너닯꽃"} />
          </div>
          <h1 className={styles.florist_name}>강릉꽃집</h1>
          <h2 className={styles.florist_address}>강원 강릉시 강릉대로 33</h2>
        </article>
      </div>
    </section>
  );
};

export default PopularFlorist;
