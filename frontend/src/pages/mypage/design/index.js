import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import FlowerImg from "@/components/common/FlowerImg";
import styles from "./index.module.scss";
import React, { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { Fetcher } from "@/pages/api/client";
import useIntersect from "@/hooks/useIntersect";
import { useRouter } from "next/router";

const CustomerDesign = () => {
  const router = useRouter();
  const { data, size, setSize, isValidating } = useSWRInfinite((index) => `custom?page=${index + 1}&size=9`, Fetcher, {
    revalidateOnFocus: false,
  });

  const lastPage = useMemo(() => {
    return data ? data[0].maxPage : 0;
  }, [data]);

  const designList = useMemo(() => {
    let designList = [];
    if (data) {
      if (data[0].result === "fail") return;
      data.map((item) => {
        designList = designList.concat(...item.designList);
      });
      return designList;
    }
  }, [size, data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (size < lastPage && !isValidating) {
      setSize(size + 1);
    }
  });

  const moveDetail = (design) => {
    router.push(`/mypage/design/${design.designId}`);
  };

  return (
    <MyWrapper>
      <MyHeader />
      {data && data[0].result === "fail" && (
        <div className={styles.not__data}>
          <p onClick={() => router.replace("/custom")} className={styles.go_custom}>
            🌸🌹 등록된 디자인이 없습니다. 나만의 꽃을 디자인해보세요.🌻🌼
          </p>
        </div>
      )}
      <div className={styles.img__container}>
        {designList &&
          designList.map((design) => (
            <div key={design.designId} className={styles.img__item} onClick={moveDetail.bind(moveDetail, design)}>
              <FlowerImg src={design.image} />
            </div>
            // <CustomerDesign.Item design={design} key={design.designId} onClick={moveDetail} />
          ))}
      </div>
      <div style={{ height: 1, width: "80%" }} ref={ref} />
    </MyWrapper>
  );
};

/*
const areEqual = (prevProps, nextProps) => {
  prevProps.design.designId === nextProps.design.designId ? true : false;
};

const DesignItem = ({ design, onClick }) => {
  console.log(design.designId);

  return (
    <div key={design.designId} className={styles.img__item} onClick={onClick}>
      <FlowerImg src={design.image} />
    </div>
  );
};

CustomerDesign.Item = React.memo(DesignItem, areEqual);
*/

export default CustomerDesign;
