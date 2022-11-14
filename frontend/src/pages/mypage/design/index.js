import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import FlowerImg from "@/components/common/FlowerImg";
import styles from "./index.module.scss";
import React, { useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { client } from "@/pages/api/client";
import useIntersect from "@/hooks/useIntersect";
import { useRouter } from "next/router";

const CustomerDesign = () => {
  const router = useRouter();
  const fetcher = (url) =>
    client.get(url).then((res) => {
      return res;
    });
  const { data, size, setSize, isValidating } = useSWRInfinite((index) => `custom?page=${index + 1}&size=9`, fetcher);

  const lastPage = useMemo(() => {
    return data ? data[0].data.maxPage : 0;
  }, [data]);

  const designList = useMemo(() => {
    let designList = [];
    if (data) {
      data.map((item) => {
        designList = designList.concat(...item.data.designList);
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
