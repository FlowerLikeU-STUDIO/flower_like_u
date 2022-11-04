import MyHeader from "@/components/mypage/MyHeader";
import MyWrapper from "@/components/common/MyWrapper";
import ResDetail from "@/components/mypage/ResDetail";
import React from "react";
import styles from "./resdetail.module.scss";

const ReservationDetail = () => {
  return (
    <MyWrapper>
      <MyHeader />
      <ResDetail />
    </MyWrapper>
  );
};

export default ReservationDetail;
