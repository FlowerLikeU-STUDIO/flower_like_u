import { useRouter } from "next/router";
import styles from "./CustomDetailCard.module.scss";
import FlowerImg from "./FlowerImg";
import useDesign from "@/hooks/useDesign";
import { useEffect, useState } from "react";

const CustomDetailCard = () => {
  const router = useRouter();
  const { designDetail } = useDesign();
  const [path, setPath] = useState(router.query.did);
  const { basics, details } = designDetail({ flowerId: path || router.query.did });
  // const { kakaoShare } = useKakao();

  useEffect(() => {
    if (router.query.did) {
      setPath(router.query.did);
    }
  }, [path]);

  useEffect(() => {
    console.log(basics);
    console.log(details);
  }, [basics]);

  //* 송이 종류
  const bunchList = { XS: 1, S: 3, M: 5, L: 7, XL: 9 };

  return (
    <div className={styles.card__wrapper}>
      {basics && (
        <>
          <div className={styles.flower__img}>
            <FlowerImg />
          </div>
          <div className={styles.main__div__wrapper}>
            <div className={styles.sub__div__wrapper}>
              <h1 className={styles.main__p}>
                {bunchList[details.size]}송이 {details.type}
              </h1>
              <p className={styles.sub__p}>{details.ribbon}리본종류</p>
              <p className={styles.line}></p>
              <p className={styles.description}>꽃이름 몇송이 꽃이름 몇송이 꽃이름 몇송이</p>
            </div>
            <div className={styles.btn__group}>
              <button className={styles.btn}>카카오톡 공유하기</button>
              <button className={styles.btn}>주문하러 가기</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDetailCard;
