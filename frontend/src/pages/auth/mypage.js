import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import classes from "./mypage.module.scss";
import axios from "axios";
import Contents from "../../components/mypage/flower_store/Contents";

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
const Mypage = ({ profile }) => {
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        {profile.type === "seller" ? <Contents {...profile} /> : <></>}
      </LayoutWrapper>
    </Fragment>
  );
};

export default Mypage;

export const getStaticProps = async () => {
  const res = await axios
    .get("https://jsonplaceholder.typicode.com/users/1")
    .then((res) => res);
  const profile = {
    type: "seller",
    userId: "ssafyb209",
    name: "김싸피",
    email: "ssafyb209@gmail.com",
    storeName: "flowershop",
    license: "00-000-00000",
    address: "대전광역시 유성구 XXX",
    profile: "base64 image",
    feedsNum: 104,
    holidays: [
      { dayOfWeek: "Sun", value: true },
      { dayOfWeek: "Mon", value: false },
      { dayOfWeek: "Tue", value: false },
      { dayOfWeek: "Wed", value: true },
      { dayOfWeek: "Thu", value: false },
      { dayOfWeek: "Fri", value: false },
      { dayOfWeek: "Sat", value: false },
    ],
    introduce:
      "안녕하세요. 이번에 덕명동으로 입점한 너닮꽃집이에요~\n대전 삼성화재 연수원 근처에 있습니다.\n문의는 채팅을통해 부탁드려요",
    rating: "4.5",
    regDate: "2022-10-25",
  };
  return { props: { profile: profile } };
};
