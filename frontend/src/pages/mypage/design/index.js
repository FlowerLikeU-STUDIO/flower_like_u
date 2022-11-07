import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import FlowerImg from "@/components/common/FlowerImg";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

const CustomerDesign = () => {
  const router = useRouter();
  // api/custom/?page=#&size=#
  //   [page] 요청할 페이지 번호
  // - 1부터 maxPage까지
  // - maxPage는 최초 접근시에도 리턴함
  // - page를 넣지 않으면 1페이지 리턴

  // [size] 요청할 목록의 개수
  // - Default로 10개의 목록 리턴
  // - 원하는 사이즈 요청 가능

  // maxPage: 6,

  // 페이지당 12개
  const designList = [
    {
      designId: "635fb710278e777c4d0f7057",
      image: "",
    },
    {
      designId: "635fb83b278e777c4d0f7058",
      image: "",
    },
    {
      designId: "635fb83c278e777c4d0f7059",
      image: "",
    },
  ];

  return (
    <MyWrapper>
      <MyHeader />
      <div className={styles.img__container}>
        {designList.map((design) => (
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
    </MyWrapper>
  );
};

export default CustomerDesign;
