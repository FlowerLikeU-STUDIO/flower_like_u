import Image from "next/image";
import styled from "styled-components";
import { ButtonWrapper } from "./ContentForm";

const DetailWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: relative;

  &.contents {
    padding: 60px 20px 20px 20px;
  }
  &.slider {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FeedTitleWrapper = styled.div`
  font-size: 30px;
  font-family: "Pretendard-Regular";
`;

const FeedCostWrapper = styled.div`
  margin: 10px 0px;
`;

const FeedContentsWrapper = styled.div`
  & p {
    white-space: pre-line;
    line-height: 30px;
  }
`;

export const ReservationButton = styled.button`
  width: 140px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffa7a5;
  color: white;
  cursor: pointer;
  &.absolute {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  /* overflow: hidden; */
`;

const SlideInnerWrapper = styled.div`
  width: 1500px;
  height: 300px;
  position: absolute;
`;

const IMAGE_LIST = [
  "/feedTest/btte1.jpeg",
  "/feedTest/btte2.jpeg",
  "/feedTest/btte3.jpeg",
  "/feedTest/btte4.jpeg",
  "/feedTest/btte5.jpeg",
];
const FeedDetail = ({ feed, onClick }) => {
  return (
    <>
      <DetailWrapper className="slider">
        <Image src={"/feedTest/btte1.jpeg"} layout="fill" objectFit="contain" />
        {/* <SlideWrapper className="slide">
          <SlideInnerWrapper className="slide-inner">
            {IMAGE_LIST.map((src) => (
              <Image src={src} layout="fill" objectFit="contain" />
            ))}
          </SlideInnerWrapper>
        </SlideWrapper> */}
      </DetailWrapper>
      <DetailWrapper className="contents">
        <FeedTitleWrapper>{"너닮 꽃 다발"}</FeedTitleWrapper>
        <FeedCostWrapper>{"18,000원"}</FeedCostWrapper>
        <FeedContentsWrapper>
          <p>
            {
              "편안한 색감의 꽃다발을 준비해봤어요.\n집에서 보관하기 쉽게 컵에 담긴 꽃다발이랍니다.\n\n보라색과 파란색상의 조합은 보는이의 마음을\n편안하게 해준다고 하네요⭐️\n소중한 사람에게 선물해보세요🐶"
            }
          </p>
        </FeedContentsWrapper>
        <ReservationButton
          onClick={() => onClick("reservation")}
          className="absolute"
        >
          {"예약하기"}
        </ReservationButton>
      </DetailWrapper>
    </>
  );
};

export default FeedDetail;
