import styles from "./MyListItem.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import { useRouter } from "next/router";

const MyListItem = (props) => {
  const router = useRouter();
  const curPath = router.pathname.split("/mypage/")[1];
  const onClick = () => {
    router.push(`/mypage/${curPath}/${props.bookId}`);
  };

  return (
    <>
      <div className={styles.main__div} onClick={onClick}>
        <ProfileImage size="small_medium" url={props.image} />
        <div className={styles.sub__div}>
          <p className={styles.title__p}>
            상호명: {props.storeName} | 예약 일시: {props.dueDate}
          </p>
          <p className={styles.sub__p}>요청사항: {props.request}</p>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
};

export default MyListItem;
