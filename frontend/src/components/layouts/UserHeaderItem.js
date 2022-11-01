import Link from "next/link";
import useUser from "../../hooks/useUser";
import SuccessAlert from "../../lib/SuccessAlert";
import { useRouter } from "next/router";
import { mutate } from "swr";
import styles from "./Header.module.scss";

const UserHeaderItem = () => {
  const { user } = useUser();
  const router = useRouter();

  const onHandleLogout = () => {
    window.sessionStorage.removeItem("ACCESS_TOKEN");
    window.sessionStorage.removeItem("REFRESH_TOKEN");
    mutate("logIn", null);
    SuccessAlert("로그아웃 되었습니다.");
    router.push("/");
  };
  return (
    <>
      {user ? (
        <>
          <Link href={user.type === "seller" ? "/mypage/feeds" : "/mypage/reservation"}>
            <a className={styles.header_anchor}>마이페이지</a>
          </Link>
          <button className={styles.logout_button} onClick={onHandleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserHeaderItem;
