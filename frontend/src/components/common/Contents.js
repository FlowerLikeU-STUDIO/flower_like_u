import { Rating } from "@mui/material";
import styled from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  align-items: ${(props) => props.alignItem};
`;

const ContentSpan = styled.span`
  font-family: "Pretendard-Regular";
  margin-left: 10px;
`;

const ContentParagraph = styled.p`
  font-family: "Pretendard-Regular";
  white-space: pre-line;
  color: #2a2a2a;
  font-weight: 400;
  font-size: 1rem;
  line-height: 36px;
  display: flex;
  align-items: center;
  margin: ${(props) => props.margin};
`;

const RatingStyle = styled(Rating)`
  color: #ffa7a5;
  & span.MuiRating-iconEmpty {
    color: #ffa7a5;
  }
`;
const Contents = ({ rating, introduce, feedsNum }) => {
  return (
    <div>
      <ContentWrapper alignItem={"center"}>
        <RatingStyle
          name="size-large"
          defaultValue={rating}
          size="large"
          precision={0.5}
          readOnly
        />{" "}
        <ContentSpan>{rating}</ContentSpan>
      </ContentWrapper>

      <ContentParagraph margin={"4px 0 0 4px"}>
        게시물 <ContentSpan>{feedsNum}개</ContentSpan>
      </ContentParagraph>

      <ContentWrapper alignItem={"stretch"}>
        <ContentParagraph margin={"8px 0 0 4px"}>{introduce}</ContentParagraph>
      </ContentWrapper>
    </div>
  );
};

export default Contents;

Contents.defaultProps = {
  rating: 4.5,
  feedsNum: 100,
  introduce: "🌻해당 꽃집의 소개가 준비중이에요🌻",
};
