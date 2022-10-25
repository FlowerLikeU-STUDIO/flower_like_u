import { Fragment } from "react";
import { useSelector } from "react-redux";
import MyPageLayout from "../../components/layouts/MyPageLayout";

const Mypage = () => {
  const role = useSelector((state) => state.user.role); //role === "seller"

  return (
    <Fragment>
      <MyPageLayout>
        {/* 왼 */}
        <img src="/auth/happyBtte.jpeg" alt="profileimg" />
        {/* 오 */}
        <p>닉네임 | 본명</p>
        <span class="material-icons-outlined">settings</span>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      </MyPageLayout>
    </Fragment>
  );
};

export default Mypage;
