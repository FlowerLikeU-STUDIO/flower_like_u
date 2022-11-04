import { useEffect, useState } from "react";
import ProfileImage from "@/components/common/ProfileImage";
import styles from "./ResDetail.module.scss";
import FlowerImg from "@/components/common/FlowerImg";
import { wrapper, ribbon, flower } from "@/components/custom/step/menu/MenuContents";

const ResDetail = ({ bookId }) => {
  // api/book/uid/bookid
  const [currentStatus, setCurrentStatus] = useState("");
  const bookData = {
    basics: {
      bookId: 1,
      type: "feed",
      customer: "김싸피",
      store: "flowerhouse",
      image: "",
      orderReq:
        "예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.예쁘게 부탁해요.",
      orderDate: "2022-10-25",
      bookDate: "2022-10-28",
      state: "inProgress",
    },
    details: {
      type: "종류 임시변수",
      image: "/home/centerFlower.png",
      // image: "",
      packing: {
        material: "paper",
        color: "blue",
      },
      ribbon: "pink",
      size: "XS",
      flowers: [
        {
          name: "lily",
          cnt: 3,
          color: ["white", "white", "red"],
        },
        {
          name: "tulip",
          cnt: 2,
          color: ["yellow", "pink"],
        },
        {
          name: "gypsophila",
          cnt: 6,
          color: ["white", "white", "white", "white", "white", "white"],
        },
      ],
      price: 21500,
    },
  };
  useEffect(() => {
    const data = bookData;
    if (!data) return;
    setCurrentStatus(data.basics.state);
  }, []);

  return (
    <div className={styles.card__wrapper}>
      <div className={styles.main__wrapper}>
        <div className={styles.main__div}>
          <ProfileImage size="small_medium" url={bookData.basics.image} />
          <div className={styles.sub__div}>
            <p className={styles.title__p}>상호명: {bookData.basics.store}</p>
            <p className={styles.sub__p}>
              예약 번호: {bookData.basics.bookId} <br />
              예약 일시: {bookData.basics.bookDate} (주문일시 : {bookData.basics.orderDate}) <br />
              꽃다발 종류: {bookData.details.type}
            </p>
          </div>
        </div>

        <div className={styles.line}></div>
        <p className={styles.flower__detail__title}>꽃다발 상세정보</p>
        <div className={styles.flower__detail}>
          <div className={styles.flower__img}>
            <FlowerImg src={bookData.details.image} />
          </div>
          <p className={styles.flower__detail_sub}>
            포장방법: 재질: {bookData.details.packing.material} | 색상: {bookData.details.packing.color}
            <br />
            꽃다발 사이즈: {bookData.details.size} <br />꽃 예상가격: {bookData.details.price} 원 <br />
            꽃 종류 <br />
            {bookData.details.flowers.map((flower, idx) => (
              <p key={idx} className={styles.flower__info}>
                {flower.name}
                {flower.cnt}
                {flower.color}
              </p>
            ))}
            요청사항: {bookData.basics.orderReq}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResDetail;
