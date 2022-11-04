import MyListItem from "@/components/mypage/MyListItem";
import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import styles from "./index.module.scss";
const CustomerReservation = () => {
  /*
  상호 프로필사진
  상호명: NEW_FLOWER | 예약 일시: 2022. 10. 14 
  요청사항: 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사
  가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 
  가나다라마바사 가나다라마바사 가나다라마바사 가나다라 (100자)
  */
  const list = [
    {
      bookId: 1,
      type: "custom",
      storeName: "flowerhouse",
      image: "",
      request:
        "가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사 가나다라 (100자)",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "inProgress",
    },
    {
      bookId: 2,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 3,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 4,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 5,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 6,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 7,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 8,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 9,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 10,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
    {
      bookId: 11,
      type: "feed",
      storeName: "flowerhouse1",
      image: "",
      request: "예쁘게 부탁해요.",
      bookDate: "2022-10-25",
      dueDate: "2022-10-28",
      state: "waited",
    },
  ];

  // https://velog.io/@a_in/Next.js-Error-Abort-fetching-for-route

  return (
    <MyWrapper>
      <MyHeader />
      <div className={styles.main__div}>
        {list.map((res, idx) => (
          <div key={idx}>
            <MyListItem
              bookId={res.bookId}
              image={res.image}
              storeName={res.storeName}
              request={res.request}
              dueDate={res.dueDate}
            />
          </div>
        ))}
      </div>
    </MyWrapper>
  );
};

export default CustomerReservation;
