import Axios from "@/api/axios";
import MySetting from "@/components/mypage/MySetting";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./withdrawal.module.scss";

const WithDrawal = () => {
  const [pwd, setPwd] = useState("");
  const router = useRouter();
  const { user } = useUser();
  const setInput = (e) => {
    const value = e.target.value;
    setPwd(value);
  };

  const authWithDrawal = async (e) => {
    e.preventDefault();
    const data = {
      userId: user.userId,
      password: pwd,
    };
    const res = await Axios.delete("auth", data).then((res) => res.data);
    if (res.result === "success") {
      alert("성공적으로 탈퇴되었습니다.");
      // !! 추후 token 초기화 로직 추가할것.
      router.push("/");
    } else {
      alert("회원탈퇴에 실패하였습니다. 비밀번호를 다시 확인해주세요");
      return;
    }
  };
  return (
    <MySetting>
      <label htmlFor="password" className={styles.label}>
        회원탈퇴
      </label>
      <label htmlFor="password" className={styles.sub__label}>
        탈퇴 후에는 계정을 복구할 수 없습니다. <hr />
        계속 진행을 원하시면 비밀번호를 입력해주세요.
      </label>
      <li className={styles.list__tag}>
        <input
          id="password"
          onChange={setInput}
          value={pwd}
          type="password"
          className={styles.input__box}
          placeholder="비밀번호를 입력해주세요."
        />
      </li>
      <button className={styles.submit__btn} onClick={authWithDrawal}>
        탈퇴하기
      </button>
    </MySetting>
  );
};

export default WithDrawal;
