import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import classes from "./mypage.module.scss";

const LayoutWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 90%;
  max-width: 75rem;
  background-color: #ffebee;
`;
const FlexDiv = styled.div`
  display: flex;
`;
const Mypage = () => {
  const role = useSelector((state) => state.user.role); //role === "seller"

  return (
    <Fragment>
      <LayoutWrapper>
        {/* 왼 */}
        <img src="/auth/happyBtte.jpeg" alt="profileimg" />
        {/* 오 */}
        <FlexDiv>
          <p className={classes.asdf}>닉네임 | 본명</p>
          <span class="material-icons-outlined">settings</span>
        </FlexDiv>
        {/* 중간선 */}
        <div>------</div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
        {/* {role === "seller" ? <사용자 /> : <사업자 />} */}
      </LayoutWrapper>
    </Fragment>
  );
};

export default Mypage;
