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
        게시물 <ContentSpan>{feedsNum}</ContentSpan>
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
  introduce:
    "안녕하세요. 이번에 덕명동으로 입점한 너닮꽃집이에요.\n대전 삼성화재연수원 근처에 있습니다.\n문의는 채팅을통해 부탁드려요",
};
