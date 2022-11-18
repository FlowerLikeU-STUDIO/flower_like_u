import styles from "./MyListItem.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import { useRouter } from "next/router";

const MyListItem = (props) => {
  const router = useRouter();
  const curPath = router.pathname.split("/mypage/")[1];
  // waited, inprogress
  const onClick = () => {
    router.push(`/mypage/${curPath}/${props.bookId}`);
  };

  const dueDate = props.dueDate;
  // !! 추후 테스트 해볼것
  function dateFormat(dueDate) {
    const date = new Date(dueDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  }
  dateFormat(dueDate);

  const typeList = {
    feed: "플로리스트 피드",
    custom: "커스텀 꽃다발",
  };

  return (
    <>
      <div className={styles.main__div}>
        <ProfileImage size="small_medium" url={props.image} />
        <div className={styles.sub__div}>
          <h1 className={styles.title__p}>
            상호명: {props.storeName} <br />
          </h1>
          <p className={styles.sub__p}>주문한 날: {props.bookDate}</p>
          <span className={styles.card_description}>
            {typeList[props.type]} 로 예약하셨어요. <br />
            <span className={styles.pickup_date}>{props.dueDate}</span> 에 늦지 않게 픽업해 주세요!
          </span>
        </div>
        <div className={styles.button_wrapper}>
          <button className={styles.button} onClick={onClick}>
            자세히 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default MyListItem;
