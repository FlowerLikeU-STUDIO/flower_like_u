import MySetting from "@/components/mypage/MySetting";
import { client } from "@/pages/api/client";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./withdrawal.module.scss";
import { mutate } from "swr";
import SuccessAlert from "@/lib/SuccessAlert";

const WithDrawal = () => {
  const [pwd, setPwd] = useState("");
  const router = useRouter();
  const setInput = (e) => {
    const value = e.target.value;
    setPwd(value);
  };

  const authWithDrawal = async (e) => {
    e.preventDefault();
    const data = {
      password: pwd,
    };
    const res = await client.delete("user", { data: data }).then((res) => res.data);
    if (res.result === "success") {
      alert("성공적으로 탈퇴되었습니다.");
      window.sessionStorage.removeItem("ACCESS_TOKEN");
      window.sessionStorage.removeItem("REFRESH_TOKEN");
      mutate("logIn", null);
      SuccessAlert("로그아웃 되었습니다.");
      router.replace("/");
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
