import Link from "next/link";
import useUser from "../../hooks/useUser";
import SuccessAlert from "../../lib/SuccessAlert";
import { useRouter } from "next/router";
import { mutate } from "swr";
import styles from "./Header.module.scss";
// 로그아웃 할 때 커스텀 초기화
import { useDispatch } from "react-redux";
import {
  selectPackage,
  selectSize,
  makeFlowerList,
  selectWrapperColor,
  selectRibbonColor,
} from "@/store/reducers/custom";
import { clearChatList } from "@/store/reducers/chat";

const UserHeaderItem = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  const onHandleLogout = () => {
    window.sessionStorage.removeItem("ACCESS_TOKEN");
    window.sessionStorage.removeItem("REFRESH_TOKEN");
    // 로그아웃 할 때 커스텀 초기화
    dispatch(selectPackage(null));
    dispatch(selectSize(null));
    dispatch(makeFlowerList(null));
    dispatch(selectWrapperColor(null));
    dispatch(selectRibbonColor(null));
    dispatch(clearChatList());
    mutate("logIn", null);
    SuccessAlert("로그아웃 되었습니다.");
    router.push("/");
  };

  return (
    <>
      {user ? (
        <>
          <Link
            href={
              user.type === "store" ? "/mypage/feeds" : "/mypage/reservation"
            }
          >
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
