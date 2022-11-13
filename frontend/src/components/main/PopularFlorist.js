import styles from "./PopularFlorist.module.scss";
import FlowerImg from "../common/FlowerImg";
import { client } from "@/pages/api/client";

const PopularFlorist = () => {
  //* 필요한 params 넣어서 api 요청 필요
  const getPopular = async () => {
    const res = await client.get(`user/stores`).then((res) => res.data);
    if (res) {
      console.log(res);
    }
  };
  return (
    <section className={styles.popular_wrapper}>
      <h1 className={styles.popular_title}>인기 플로리스트</h1>
      <div className={styles.florist_wrapper}>
        <article className={styles.florist_card}>
          <div className={styles.card_img}>
            <FlowerImg src="/auth/floristDefaultProfile.png" alt={"너닯꽃"} />
          </div>
          <h2 className={styles.florist_name}>꽃풍선 장인</h2>
          <span className={styles.florist_address}>
            대전광역시 구암동 678-2 어울림
          </span>
        </article>
        <article className={styles.florist_card}>
          <div className={styles.card_img}>
            <FlowerImg src="/home/3.png" alt={"너닯꽃"} />
          </div>
          <h2 className={styles.florist_name}>싸피꽃집</h2>
          <span className={styles.florist_address}>
            대전광역시 유성구 동서대로 98-39
          </span>
        </article>
        <article className={styles.florist_card}>
          <div className={styles.card_img}>
            <FlowerImg src="/home/9.png" alt={"너닯꽃"} />
          </div>
          <h2 className={styles.florist_name}>고래꽃집</h2>
          <span className={styles.florist_address}>
            울산광역시 남구 옥동 은월로 2번길
          </span>
        </article>
        <article className={styles.florist_card}>
          <div className={styles.card_img}>
            <FlowerImg src="/home/5.png" alt={"너닯꽃"} />
          </div>
          <h2 className={styles.florist_name}>강릉꽃집</h2>
          <span className={styles.florist_address}>
            강원 강릉시 강릉대로 33
          </span>
        </article>
      </div>
    </section>
  );
};

export default PopularFlorist;
