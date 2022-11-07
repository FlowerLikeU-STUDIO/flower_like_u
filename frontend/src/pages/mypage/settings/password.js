import MySetting from "@/components/mypage/MySetting";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import styles from "./password.module.scss";
import classnames from "classnames";
import MyPwInput from "@/components/mypage/MyPwInput";
import Axios from "@/api/axios";
import { useRouter } from "next/router";

const ModifyPassword = () => {
  const cx = classnames.bind(styles);
  const router = useRouter();
  const { user } = useUser();
  const [isModify, setIsModify] = useState(false);

  const [curPw, setCurPw] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [sameMsg, setSameMsg] = useState("");

  const data = {
    userId: user.userId,
    curPwd: curPw,
    newPwd: pw1,
    newpwd2: pw2,
  };

  // *패스워드 일치여부 확인 후 반영
  const pwdCheck = (e) => {
    const value = e.target.value;
    console.log(pw1);
    setPw2(value);
    if (pw1 === value) {
      setSameMsg("비밀번호가 일치합니다.");
    } else {
      setSameMsg("");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    if (isModify === false) {
      setIsModify(!isModify);
      return;
    }
    // *수정상태일때
    if (pw1 === "" || pw2 === "" || curPw === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (pw1 !== pw2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (pw1 === curPw) {
      alert("같은 비밀번호로 변경할 수 없습니다.");
      return;
    }
    const res = await Axios.put("auth/changePassword", data).then((res) => res.data);
    if (res.result === "success") {
      setIsModify(!isModify);
      setCurPw("");
      setPw1("");
      setPw2("");
      setSameMsg("");
      setIsModify(false);
      alert("비밀번호 변경에 성공하였습니다. 로그인 페이지로 이동합니다.");
      router.push("/auth/login");
      // !! 추후 token 초기화 로직 추가할것.
    } else {
      alert("비밀번호가 변경에 실패하였습니다.");
      return;
    }
  };

  return (
    <MySetting>
      {/* 0 */}
      <MyPwInput
        id="password0"
        label="password0"
        className={styles.input__box}
        name="현재 비밀번호"
        value={curPw}
        setValue={setCurPw}
        disabled={!isModify}
        type="password"
      />
      {/* 1 */}
      <MyPwInput
        id="password1"
        label="password1"
        className={styles.input__box}
        name="비밀번호 변경"
        value={pw1}
        setValue={setPw1}
        disabled={!isModify}
        type="password"
      />
      {/* 2 */}
      <label htmlFor="password2" className={styles.label}>
        비밀번호 재입력
      </label>
      <li className={styles.list__tag}>
        <input
          id="password2"
          className={styles.input__box}
          name="비밀번호2"
          value={pw2}
          onChange={pwdCheck}
          disabled={!isModify}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </li>
      <p className={styles.same__pwd}>{sameMsg}</p>
      <div className={styles.position__btn}>
        {isModify && (
          <button
            type="submit"
            form="modify__form"
            className={cx(styles.submit__btn, {
              [styles.edit__falsebtn]: isModify,
            })}
            onClick={() => {
              setCurPw("");
              setPw1("");
              setPw2("");
              setSameMsg("");
              setIsModify(false);
            }}
          >
            취소
          </button>
        )}
        <button
          type="submit"
          form="modify__form"
          className={cx(styles.submit__btn, {
            [styles.edit__falsebtn]: isModify,
            [styles.edit__truebtn]: !isModify,
          })}
          onClick={submitPassword}
        >
          {!isModify ? "수정" : "완료"}
        </button>
      </div>
    </MySetting>
  );
};

export default ModifyPassword;
