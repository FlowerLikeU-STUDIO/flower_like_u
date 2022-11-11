import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import FlowerImg from "@/components/common/FlowerImg";
import styles from "./index.module.scss";
import useDesign from "@/hooks/useDesign";
import { useState } from "react";

const Page = ({ currentPage, setCurrentPage }) => {
  const { desginList } = useDesign();
  const { data, maxPage, mutate } = desginList(currentPage);

  return (
    <div className={styles.img__container}>
      {data &&
        data.map((design) => (
          <div
            key={design.designId}
            className={styles.img__item}
            onClick={() => {
              router.push(`/mypage/design/${design.designId}`);
            }}
          >
            <FlowerImg src={design.image} />
          </div>
        ))}
    </div>
  );
};

const CustomerDesign = () => {
  const [cnt, setCnt] = useState(1);
  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<Page currentPage={cnt} setCurrentPage={setCnt} key={i} />);
  }

  return (
    <MyWrapper>
      <MyHeader />
      {pages}
    </MyWrapper>
  );
};

export default CustomerDesign;
