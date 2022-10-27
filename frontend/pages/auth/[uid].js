import classNames from "classnames";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Button from "../../styles/Button";
import styles from "./[uid].module.scss";

const Mypage = () => {
  const role = "seller"; // buyer, seller (data로 받게 될 시 삭제)
  const isTrue = true;
  return (
    <div className={styles.layout}>
      <div className={styles.profile}>
        <div className={styles.profile_img} />
        <div className={styles.flexdiv}>
          <div>
            <span>닉네임 | 본명</span>
            <span class="material-icons-outlined">settings</span>
          </div>
          {role === "seller" && (
            <div className={styles.profile_seller}>
              <p>판매자 프로필 하단</p>
              <p>판매자 프로필 하단</p>
            </div>
          )}
        </div>
      </div>
      <hr classNames />
      <div>
        <Button color="pink">가나다라마바사</Button>
        <button
          className={classNames({
            [styles.btn_yellow]: isTrue,
          })}
        >
          asdf
        </button>
        <button className={`commentBtn ${isTrue ? "btn_yellow" : "btn_default"}`}>asdf</button>
        <button>asdf</button>
      </div>
      {/* {role === "seller" ? <사용자 /> : <사업자 />} */}
    </div>
  );
};

export default Mypage;

/*
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
  a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
  Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
  of Lorem Ipsum.
*/
