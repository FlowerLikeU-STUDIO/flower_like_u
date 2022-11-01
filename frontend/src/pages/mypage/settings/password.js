import MySetting from "@/components/auth/MySetting";
import useMypage from "@/hooks/useMypage";
import { useState } from "react";
import styles from "./password.module.scss";
import classnames from "classnames";

const ModifyPassword = () => {
  const cx = classnames.bind(styles);
  const uid = "mypage-buyer";
  // const uid = "mypage-seller";
  const { data, type } = useMypage(uid);
  console.log(data);
  const [isModify, setIsModify] = useState(false);
  const [curPw, setCurPw] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");

  /**
    {"userId" : "ssafyb209",
    "curPwd" : "qwerty1234",
    "newPwd" : "q1w2e3r4t5y",
    "newPwd2" : "q1w2e3r4t5y"}
 */

  return (
    <MySetting>
      {/* 0 */}
      <label for="password1" className={styles.label}>
        현재 비밀번호
      </label>
      <li className={styles.list__tag}>
        <input id="password1" className={styles.input__box} name="현재비밀번호" value={curPw} disabled={!isModify} />
      </li>
      {/* 1 */}
      <label for="password1" className={styles.label}>
        비밀번호 변경
      </label>
      <li className={styles.list__tag}>
        <input id="password1" className={styles.input__box} name="비밀번호1" value={pw1} disabled={!isModify} />
      </li>
      {/* 2 */}
      <label for="password2" className={styles.label}>
        비밀번호 재입력
      </label>
      <li className={styles.list__tag}>
        <input id="password2" className={styles.input__box} name="비밀번호2" value={pw2} disabled={!isModify} />
      </li>

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

export default ModifyPassword;
