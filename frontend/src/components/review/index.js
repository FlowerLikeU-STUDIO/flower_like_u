import useIntersect from "@/hooks/useIntersect";
import React, { useMemo } from "react";
import styled from "styled-components";
import Spinner from "../spinner";
import Card from "./Card";
import useSWRInfinite from "swr/infinite";
import { client } from "@/pages/api/client";

const Target = styled.div`
  height: 1px;
  width: 80%;
`;

const ReviewWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  /* min-height: calc(100vh - 68px); */
`;
const ReviewListWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  width: 80%;
  max-width: 920px;
  height: auto;
  /* min-height: 100vh; */
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  place-items: center;
  row-gap: 50px;
  column-gap: 80px;
  @media screen and (max-width: 950px) {
    column-gap: 20px;
  }
  @media screen and (max-width: 780px) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 20px;
    column-gap: 4px;
  }
`;
const PAGE_SIZE = 8;
const fetcher = (url) => client.get(url).then((res) => res);
const Review = ({ storeId }) => {
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) => `review/${storeId}?page=${index + 1}&size=${PAGE_SIZE}`,
    fetcher
  );

  const isEmpty = data?.[0]?.data.content.length === 0;

  const reviewList = useMemo(() => {
    let reviewList = [];
    if (data) {
      data.map((item) => {
        reviewList = reviewList.concat(...item.data.content);
      });
      return reviewList;
    }
  }, [size, data]);

  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.data.last);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isValidating && !isReachingEnd) {
      setSize(size + 1);
    }
  });
  return (
    <>
      <ReviewWrapper>
        {reviewList ? (
          <>
            <ReviewListWrapper>
              {reviewList.map((review, index) => (
                <Review.Item
                  review={review}
                  index={index}
                  key={
                    (Number.MAX_SAFE_INTEGER & review.reviewId)
                      .toString(2)
                      .padStart(53, 0) + review.reviewId
                  }
                />
              ))}
            </ReviewListWrapper>
            {isValidating && !isReachingEnd ? <div>{<Spinner />}</div> : <></>}
            <Target ref={ref} />
          </>
        ) : (
          <div>
            <Spinner />
          </div>
        )}
        <div>{isEmpty ? <>등록된 후기가 없습니다.</> : <></>}</div>
      </ReviewWrapper>
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  parseInt(prevProps.review.reviewId) === parseInt(nextProps.review.reviewId)
    ? true
    : false;
};

const ReviewItem = ({ review, index }) => {
  console.log(review);
  return <Card key={index} {...review} />;
};

Review.Item = React.memo(ReviewItem, areEqual);

export default Review;
