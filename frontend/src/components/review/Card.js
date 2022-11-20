import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  padding: 80px 18px 12px 18px;
  border: transparent;
  box-sizing: border-box;
  border-radius: 24px;
  width: 100%;
  max-width: 340px;
  min-width: 300px;
  height: 340px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bgColor};
`;

const CardContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 26px;
  background-color: #fff;
  padding: 12px 12px;
`;

const ProfileWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  top: -80px;
  width: 140px;
  height: 140px;
  & img {
    border-radius: 100%;
  }
`;

const ReviewContentWrapper = styled.div`
  position: relative;
  padding: 4px;
  top: -70px;
`;

const TitleRatingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0px 8px 0px;
`;

const ContentWrapper = styled.div`
  & p {
    word-break: break-all;
    line-height: 22px;
  }
`;
const CARD_COLOR = [
  "#DBFFFF",
  "#E1EBFF",
  "#DDFFF8",
  "#BEFFDA",
  "#D7FFCE",
  "#D2ECFF",
  "#E1FAFF",
  "#FFEDE1",
  "#e7e3ff",
];
const getRandomNumber = () => {
  return Math.floor(Math.random() * CARD_COLOR.length);
};
const Card = ({
  reviewId,
  writer,
  rating,
  content,
  regDate,
  writerProfile,
}) => {
  return (
    <CardWrapper bgColor={CARD_COLOR[getRandomNumber()]}>
      <CardContentWrapper>
        <ProfileWrapper>
          <Image
            src={writerProfile ? writerProfile : "/auth/profileDefault.png"}
            layout={"fill"}
            objectFit={"cover"}
          />
        </ProfileWrapper>
        <ReviewContentWrapper>
          <TitleRatingWrapper>
            <div>{writer}님</div>
            <div>
              <Rating
                defaultValue={rating}
                size="medium"
                precision={0.5}
                readOnly
                // className={styles.starrating}
              />
            </div>
          </TitleRatingWrapper>
          <ContentWrapper>
            <p>{content}</p>
          </ContentWrapper>
        </ReviewContentWrapper>
      </CardContentWrapper>
    </CardWrapper>
  );
};

export default React.memo(Card);
