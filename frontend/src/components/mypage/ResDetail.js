import { useEffect, useState } from "react";
import ProfileImage from "@/components/common/ProfileImage";
import styles from "./ResDetail.module.scss";
import FlowerImg from "@/components/common/FlowerImg";
import { useRouter } from "next/router";
import { Modal } from "@mui/material";
import ResReview from "./ResReview";

const ResDetail = ({ bookId }) => {
  // api/book/uid/bookid
  const [currentStatus, setCurrentStatus] = useState("");
  const router = useRouter();
  const currentRoute = router.pathname.split("/")[2];
  const userId = "useruser5";
  const storeId = "useruser2";

  // ! 더미데이터
  const bookData = {
    basics: {
      bookId: 1,
      type: "feed", //없어도 됩니다
      customer: "김싸피", //구매자가 조회하는거라면  여기서 userId가 필요합니다.
      store: "flowerhouse",
      storeId: 1234, //storeId 필요합니다.
      image: "",
      orderReq: "예쁘게 부탁해요.",
      orderDate: "2022-10-25",
      bookDate: "2022-10-28",
      state: "inProgress",
      hasReview: false, //리뷰 여부
    },
    details: {
      packing: {
        //유지언니더미데이터와 비교 필요 (material 없음, color만 존재)
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

  // ! 리뷰작성관련
  const hasReview = bookData.basics.hasReview;
  const [open, setOpen] = useState(false);

  const reviewOn = () => setOpen(true);
  const reviewClose = () => setOpen(false);

  useEffect(() => {
    const data = bookData;
    if (!data) return;
    setCurrentStatus(data.basics.state);
  }, []);

  return (
    <div className={styles.card__wrapper}>
      <div className={styles.main__wrapper}>
        <div className={styles.main__div__wrapper}>
          <div className={styles.main__div}>
            <ProfileImage size="small_medium" url={bookData.basics.image} />
            <div className={styles.sub__div}>
              <div>
                <p className={styles.title__p}>상호명: {bookData.basics.store}</p>
                <p className={styles.sub__p}>
                  예약 번호: {bookData.basics.bookId} <br />
                  예약 일시: {bookData.basics.bookDate} (주문일시 : {bookData.basics.orderDate}) <br />
                  꽃다발 종류: {bookData.details.type}
                </p>
              </div>
            </div>
            <div className={styles.btn__wrapper}>
              {currentRoute === "reservation" ? (
                <button>예약취소</button>
              ) : (
                <>
                  <button className={styles.primary900} onClick={() => console.log("asdf")}>
                    수령완료
                  </button>
                  <button
                    className={true ? styles.primary_disable : styles.primary900}
                    onClick={reviewOn}
                    disabled={!hasReview ? false : true}
                  >
                    후기작성
                  </button>
                  <div>
                    <Modal
                      open={open}
                      onClose={reviewClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <ResReview userId={userId} storeId={storeId} reviewClose={reviewClose} />
                    </Modal>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.line}></div>
        <p className={styles.flower__detail__title}>꽃다발 상세정보</p>
        <div className={styles.flower__detail}>
          <div className={styles.flower__img}>
            <FlowerImg src={bookData.details.image} />
          </div>
          <p className={styles.flower__detail_sub}>
            포장방법: 재질: {bookData.details.packing.material} | 색상: {bookData.details.packing.color} | 리본 :{" "}
            {bookData.details.ribbon}
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
