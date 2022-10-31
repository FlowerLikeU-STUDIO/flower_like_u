import MySetting from "@/components/auth/MySetting";
import useMypage from "@/hooks/useMypage";
import classnames from "classnames";
import { useRef, useState } from "react";
import styles from "./modify.module.scss";

const ModifyAuth = () => {
  const [isModify, setIsModify] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const cx = classnames.bind(styles);

  const uid = "mypage-buyer";
  // const uid = "mypage-seller";
  const { data, type } = useMypage(uid);
  console.log(data);

  // *자식 컴포넌트에 props 내려주는 것 적용(hoc?)
  const nickName = useRef();

  const NicknameCheck = (e) => {
    e.preventDefault();
    setIsNickname(!isNickname);
  };

  return (
    <MySetting>
      <form id="modify__form" className={styles.modify__form}>
        <label className={styles.label}>이메일</label>
        <li className={styles.list__tag}>{data.email}</li>
        <label className={styles.label}>이름</label>
        <li className={styles.list__tag}>{data.name}</li>
        <label for="nick" className={styles.label}>
          닉네임
        </label>
        <div className={styles.nickname__div}>
          <li className={styles.list__tag}>
            <input
              id="nick"
              // className={cx({
              //   [styles.input__box__disable]: !isModify,
              //   [styles.input__box]: isModify,
              // })}
              className={styles.input__box}
              name="닉네임"
              value={data.nickname}
              disabled={!isModify}
            />
          </li>
          <button
            className={cx(styles.nickname__check, {
              [styles.nickname__check__false]: !isNickname,
              [styles.nickname__check__true]: isNickname,
            })}
            onClick={NicknameCheck}
          >
            중복확인
          </button>
        </div>
        <label for="addr" className={styles.label}>
          주소
        </label>
        <li className={styles.list__tag}>
          <input id="addr" className={styles.input__box} name="주소" value={data?.address} disabled={!isModify} />
        </li>
      </form>
      <div className={styles.position__btn}>
        <button
          type="submit"
          form="modify__form"
          className={cx(styles.submit__btn, {
            [styles.edit__falsebtn]: !isModify,
            [styles.edit__truebtn]: isModify,
          })}
          onClick={(e) => {
            e.preventDefault();
            setIsModify(!isModify);
          }}
        >
          {!isModify ? "수정" : "완료"}
        </button>
      </div>
    </MySetting>
  );
};

export default ModifyAuth;
