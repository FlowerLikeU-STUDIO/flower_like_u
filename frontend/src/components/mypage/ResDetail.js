import { useEffect, useState } from "react";
import ProfileImage from "@/components/common/ProfileImage";
import styles from "./ResDetail.module.scss";
import FlowerImg from "@/components/common/FlowerImg";
import { useRouter } from "next/router";
// import { Modal } from "@mui/material";
import ResReview from "./ResReview";
import { client } from "@/pages/api/client";
import useRes from "@/hooks/useRes";
import Button from "@/components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "@/store/reducers/modal";
import SmallModal from "../modal/SmallModal";

const ResDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentRoute = router.pathname.split("/")[2];
  const { resDetail } = useRes();
  const { basics, details, mutate } = resDetail({ userId: router.query.rid || router.query.oid });

  const resCancel = async () => {
    if (window.confirm("예약을 취소하시겠습니까?")) {
      const res = await client.delete(`book/${basics.bookId}`);
      if (res.result === "success") {
        await router.replace("/mypage/reservation");
        alert("예약이 취소되었습니다.");
      } else {
      }
    } else {
      alert("동작을 취소했습니다.");
      return;
    }
  };

  // ! 리뷰작성관련
  const isOpen = useSelector((state) => state.modal.isOpen);
  const onHandleOpen = () => {
    dispatch(modalOpen());
  };

  return (
    <div className={styles.card__wrapper}>
      {basics && (
        <div className={styles.main__wrapper}>
          <div className={styles.main__div__wrapper}>
            <div className={styles.main__div}>
              <ProfileImage size="small_medium" url={basics.image} />
              <div className={styles.sub__div}>
                <div>
                  <p className={styles.title__p}>상호명: {basics.storeName}</p>
                  <p className={styles.sub__p}>
                    예약 번호: {basics.bookId} <br />
                    예약 일시: {basics.bookDate.split("T")[0]} (주문일시 : {basics.dueDate.split("T")[0]}) <br />
                  </p>
                </div>
              </div>
              <div className={styles.btn__wrapper}>
                {currentRoute === "reservation" ? (
                  basics.state === "waited" && (
                    <Button onClick={resCancel} color="primary900">
                      예약취소
                    </Button>
                  )
                ) : (
                  <>
                    {basics.state === "recipt" ? (
                      <Button color="primary900" onClick={onHandleOpen}>
                        <p>후기작성</p>
                      </Button>
                    ) : (
                      <Button color="primary300p" onClick={onHandleOpen}>
                        <p>후기보기</p>
                      </Button>
                    )}
                    {/* 리뷰모달 */}
                    <div>
                      {isOpen && (
                        <>
                          <SmallModal>
                            <ResReview
                              mutate={mutate}
                              userId={basics.consumerId}
                              storeId={basics.storeId}
                              storeName={basics.storeName}
                              bookId={basics.bookId}
                              reviewId={basics.reviewId}
                            />
                          </SmallModal>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {basics.type === "custom" && (
            <>
              <div className={styles.line}></div>
              <p className={styles.flower__detail__title}>꽃다발 상세정보</p>
              <div className={styles.flower__detail}>
                <div className={styles.flower__img}>
                  <FlowerImg src={basics.image} />
                </div>
                <p className={styles.flower__detail_sub}>
                  포장방법: {details.wrapper}
                  <br />
                  리본 : {details.ribbon}
                  <br />
                  포장 종류: {details.type} <br />
                  꽃다발 사이즈: {details.size} <br />
                  {details.flowers.map((flower, idx) => (
                    <p key={idx} className={styles.flower__info}>
                      {flower}
                    </p>
                  ))}
                  요청사항: {basics.request}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResDetail;
