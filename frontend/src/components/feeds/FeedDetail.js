import Image from "next/image";
import styled from "styled-components";
import { ButtonWrapper } from "./ContentForm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DetailWrapper = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  &.slider_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.contents {
    padding: 60px 20px 20px 20px;
  }
  &.slider_wrapper {
    justify-content: center;
    align-items: center;
  }
  & div.slick-slider {
    width: 100%;
    height: 95%;
  }
  & div.slick-list {
    height: 100%;
  }
  & div.slick-track {
    height: 100%;
  }
  & button.slick-prev {
    left: 4px;
    z-index: 10;
    box-shadow: 0px 1px 4px #d6d6d6;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #dddddd;
  }
  & button.slick-next {
    right: 4px;
    z-index: 10;
    box-shadow: 0px 1px 4px #d6d6d6;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #dddddd;
  }

  & div.slick-slide > div {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  & div.slick-slide > div img {
    max-width: 400px;
    max-height: 400px;
  }
  & ul.slick-dots {
    bottom: -17px;
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

const IMAGE_LIST = [
  "/feedTest/btte1.jpeg",
  "/feedTest/btte2.jpeg",
  "/feedTest/btte3.jpeg",
  "/feedTest/btte4.jpeg",
  "/feedTest/btte5.jpeg",
];

const settings = {
  dots: true,
  fade: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const FeedDetail = ({ feed, onClick }) => {
  return (
    <>
      <DetailWrapper className="slider_wrapper">
        <Slider {...settings}>
          {feed.image.map((item, idx) => (
            <Image
              src={item}
              width={400}
              height={400}
              key={idx}
              objectFit={"contain"}
            />
          ))}
        </Slider>
      </DetailWrapper>
      <DetailWrapper className="contents">
        <FeedTitleWrapper>{feed.name}</FeedTitleWrapper>
        <FeedCostWrapper>{`${feed.price} 원`}</FeedCostWrapper>
        <FeedContentsWrapper>
          <p>{feed.content}</p>
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
