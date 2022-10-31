import React, { useState } from "react";
import Link from "next/link";
import styles from "./MyContentBtn.module.scss";

const MyContentBtn = ({ props }) => {
  const pagePath = { consumer: ["reservation", "order", "design"], seller: ["feeds", "reviews", "order-manage"] };
  if (!props) return;
  const path = pagePath[props];
  console.log(props);
  return (
    <div className={styles.btn__div}>
      <Link href={`/mypage/${path[0]}`}>
        <button className={styles.path__btn}>{path[0]}</button>
      </Link>
      <Link href={`/mypage/${path[1]}`}>
        <button className={styles.path__btn}>{path[1]}</button>
      </Link>
      <Link href={`/mypage/${path[2]}`}>
        <button className={styles.path__btn}>{path[2]}</button>
      </Link>
    </div>
  );
};

export default MyContentBtn;
