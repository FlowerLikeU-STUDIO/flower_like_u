import styles from "./PopularFlorist.module.scss";
import FlowerImg from "../common/FlowerImg";
import { client } from "@/pages/api/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Rating } from "@mui/material";

const PopularFlorist = () => {
  const router = useRouter();

  //* 인기있는 꽃집 요청 (별점 순)
  const [popular, setPopular] = useState();

  const getPopular = async () => {
    const res = await client
      .get(`user/stores?page=1&size=4&sort=rating`)
      .then((res) => res.data);
    if (res) {
      setPopular(res.storeInfo.list);
    }
  };

  useEffect(() => getPopular, []);

  return (
    <section className={styles.popular_wrapper}>
      <h1 className={styles.popular_title}>인기 플로리스트</h1>
      <section className={styles.florist_card_wrapper}>
        {popular ? (
          popular.map((florist) => (
            <article
              key={florist.storeId}
              className={styles.florist__wrapper}
              onClick={() => router.push(`/florist/${florist.storeId}`)}
            >
              <div className={styles.store__img}>
                <FlowerImg src={florist.profile} florist={"florist"} />
              </div>
              <div className={styles.store__info}>
                <p className={styles.store__name}>{florist.storeName}</p>
                <p className={styles.store__adderss}>{florist.address}</p>
                <div className={styles.store__star}>
                  <Rating
                    defaultValue={florist.rating}
                    size="medium"
                    precision={0.5}
                    readOnly
                    className={styles.starrating}
                  />
                  <span>{florist.rating}점</span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <></>
        )}
      </section>
    </section>
  );
};

export default PopularFlorist;
