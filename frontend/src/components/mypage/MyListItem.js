import styles from "./MyListItem.module.scss";
import ProfileImage from "@/components/common/ProfileImage";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../common/Button";

const MyListItem = (props) => {
  const router = useRouter();
  const curPath = router.pathname.split("/mypage/")[1];
  // waited, inprogress
  const onClick = () => {
    router.push(`/mypage/${curPath}/${props.bookId}`);
  };

  const dueDate = props.dueDate;
  // !! 추후 테스트 해볼것 - 현재 강제로 데이터 넣어 한국시간 적용안되어 비교 불가
  function dateFormat(dueDate) {
    const date = new Date(dueDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    // console.log(dueDate, "::");
    // console.log(date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
    return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  }
  dateFormat(dueDate);

  return (
    <>
      <div className={styles.main__div} onClick={onClick}>
        <ProfileImage size="small_medium" url={props.image} />
        <div className={styles.sub__div}>
          <p className={styles.title__p}>
            상호명: {props.storeName} | 예약 일시: {props.dueDate.split("T")[0]}
          </p>
          <p className={styles.sub__p}>요청사항: {props.request}</p>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
};

export default MyListItem;
