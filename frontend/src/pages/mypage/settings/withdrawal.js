import MySetting from "@/components/auth/MySetting";
import styles from "./withdrawal.module.scss";

const WithDrawal = () => {
  return (
    <MySetting>
      <label for="password" className={styles.label}>
        회원탈퇴
      </label>
      <label for="password" className={styles.sub__label}>
        탈퇴 후에는 계정을 복구할 수 없습니다. <hr />
        계속 진행을 원하시면 비밀번호를 입력해주세요.
      </label>
      <li className={styles.list__tag}>
        <input id="password" className={styles.input__box} name="현재비밀번호" />
      </li>
      <button className={styles.submit__btn}>탈퇴하기</button>
    </MySetting>
  );
};

export default WithDrawal;
