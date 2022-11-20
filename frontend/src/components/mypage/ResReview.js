import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ResReview.module.scss";
import { client } from "@/pages/api/client";

import { Rating } from "@mui/material";
import { modalClose } from "@/store/reducers/modal";
import Button from "@/components/common/Button";

const BasicRating = ({ setIsStar, reviewId }) => {
  const [value, setValue] = useState(5);

  return (
    <div className={styles.rating__wrapper}>
      <span>별점: </span>
      <Rating
        className={styles.rating}
        name="simple-controlled"
        readOnly={reviewId ? true : false}
        value={Number(value) || 0}
        onClick={(e) => {
          setValue(e.target.value);
          setIsStar(e.target.value);
        }}
      />
    </div>
  );
};

const ResReview = ({ mutate, reviewId, bookId, storeId, storeName }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const [isComment, setComment] = useState("");
  const [isStar, setIsStar] = useState(5);

  const submitReview = async () => {
    const reviewData = {
      storeId: storeId,
      bookId: bookId,
      rating: Number(isStar),
      content: isComment,
    };
    if (reviewData.content.length < 10) {
      alert("10자이상 입력해 주세요");
      return;
    }
    if (reviewData.content.length > 100) {
      setComment(isComment.slice(0, 100));
      alert("100 미만 입력해주세요.");
      return;
    }

    const res = await client.post("review", reviewData);
    if (res.data.result === "success") {
      mutate();
      setIsStar(5);
      setComment("");
      dispatch(modalClose());
      alert("후기가 정상적으로 작성되었습니다.");
    }
  };

  const hasReview = async () => {
    const res = await client
      .get(`review/detail/${reviewId}`)
      .then((res) => res.data);
    if (res.result == "success") {
      setIsStar(res.reviewInfo.rating);
      setComment(res.reviewInfo.content);
    }
  };
  useEffect(() => {
    if (reviewId) {
      hasReview();
    }
  }, [isOpen]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.text__wrapper}>
        {reviewId ? (
          <span>{storeName}에 작성한 리뷰 입니다.</span>
        ) : (
          <span>{storeName}에 대한 리뷰를 작성해주세요🌸</span>
        )}
        <button
          className={styles.fixed__close}
          onClick={() => dispatch(modalClose())}
        >
          x
        </button>
        <BasicRating setIsStar={setIsStar} reviewId={reviewId} />
      </div>
      <textarea
        className={styles.text__area}
        value={isComment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        disabled={reviewId}
      ></textarea>
      {!reviewId && (
        <div className={styles.btn}>
          <Button color="mainPrimary" onClick={submitReview}>
            리뷰 작성
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResReview;
