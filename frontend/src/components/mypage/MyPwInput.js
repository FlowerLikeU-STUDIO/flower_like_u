import { useCallback, useState } from "react";
import styles from "./MyPwInput.module.scss";
import regexCheck from "@/lib/utils/regexCheck";

const MyPwInput = ({ label, disabled, value, setValue, name, type }) => {
  const [err, setErr] = useState("");

  const setInput = useCallback((e) => {
    const passwordRegex = regexCheck.password;
    const passwordCurrent = e.target.value;
    if (passwordCurrent.length > 16) {
      setValue(passwordCurrent.slice(0, 16));
      return;
    }
    if (!passwordRegex.test(passwordCurrent)) {
      setErr("숫자+영문자+특수문자 조합으로 8~16자 입력");
    } else {
      setErr("");
    }
    setValue(passwordCurrent);
  }, []);

  return (
    <>
      <label htmlFor={label} className={styles.label}>
        {name}
      </label>
      <li className={styles.list__tag}>
        <input
          disabled={disabled}
          onChange={setInput}
          value={value}
          type={type}
          className={styles.input__box}
          placeholder="비밀번호를 입력해주세요."
        />
      </li>
      <p className={styles.err}>{err}</p>
    </>
  );
};

export default MyPwInput;
MyPwInput.defaultProps = {
  type: "text",
};
