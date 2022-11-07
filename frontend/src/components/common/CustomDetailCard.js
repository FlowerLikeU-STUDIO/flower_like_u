import { useRouter } from "next/router";
import styles from "./CustomDetailCard.module.scss";
import FlowerImg from "./FlowerImg";

const CustomDetailCard = () => {
  const router = useRouter();
  const currentPath = router.pathname.split("/")[1];
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.flower__img}>
        <FlowerImg />
      </div>
      <div className={styles.main__div__wrapper}>
        <div className={styles.sub__div__wrapper}>
          <h1 className={styles.main__p}>n송이 꽃다발</h1>
          <p className={styles.sub__p}>포장지 | 리본종류</p>
          <p className={styles.line}></p>
          <p className={styles.description}>
            꽃이름 몇송이 <hr />
            꽃이름 몇송이 <hr />
            꽃이름 몇송이 <hr />
          </p>
        </div>
        <div className={styles.btn__group}>
          <button className={styles.btn}>카카오톡 공유하기</button>
          {currentPath === "mypage" ? (
            <>
              <button className={styles.btn}>주문하러 가기</button>
            </>
          ) : (
            <>
              <button className={styles.btn}>내 디자인 보러가기</button>
              <button className={styles.btn}>카카오톡 공유하기</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDetailCard;
