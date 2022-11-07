import { useState } from "react";
import { Box, Button, Rating } from "@mui/material";

const BasicRating = ({ setIsStar }) => {
  const [value, setValue] = useState(5);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <div style={{ display: "flex", alignContent: "center" }}>
        <span style={{ marginTop: 7, paddingLeft: 2, marginRight: 5 }}>별점: </span>
        <Rating
          name="simple-controlled"
          value={Number(value) || 0}
          onClick={(e) => {
            setValue(e.target.value);
            setIsStar(e.target.value);
          }}
        />
      </div>
    </Box>
  );
};

// 모달 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90%",
  bgcolor: "background.paper",
  borderRadius: "2%",
  border: "2px #000",
  boxShadow: 24,
  p: 3,
};

const ResReview = ({ userId, reviewClose }) => {
  const [isComment, setComment] = useState("");
  const [isStar, setIsStar] = useState(5);

  const submitReview = () => {
    const review = {
      consumerId: userId,
      storeId: 2,
      score: Number(isStar),
      content: isComment,
    };
    if (review.content < 10) {
      alert("10자이상 입력해 주세요");
    } else if (review.content > 100) {
      alert("100 미만 입력해주세요.");
    } else {
      // 리뷰 요청
      // !api 완성 시 연결
      setIsStar(5);
      setComment("");
      reviewClose();
    }
  };

  return (
    <Box sx={style}>
      <p style={{ marginBottom: 3 }}>가게이름에 리뷰를 작성해 보세요</p>
      <div style={{ paddingTop: 3 }}>
        <BasicRating setIsStar={setIsStar} />
        <textarea
          style={{
            width: "100%",
            height: 120,
            backgroundColor: "#eeeeee",
            borderRadius: 2,
            padding: 10,
          }}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
      </div>
      <Button onClick={submitReview} sx={{ width: "100%" }}>
        리뷰 작성
      </Button>
    </Box>
  );
};

export default ResReview;
