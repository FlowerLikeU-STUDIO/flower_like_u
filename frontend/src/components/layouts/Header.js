import SuccessAlert from "@/lib/SuccessAlert";
import storage from "@/lib/utils/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";

const Header = () => {
  const cx = classNames.bind(styles);
  const { data: isLogin } = useSWR("logIn", storage);
  const router = useRouter();
  const onHandleLogout = () => {
    window.sessionStorage.removeItem("ACCESS_TOKEN");
    window.sessionStorage.removeItem("REFRESH_TOKEN");
    mutate("logIn", null);
    SuccessAlert("로그아웃 되었습니다.");
    router.push("/");
  };

  //* 헤더 opacity 조정을 위한 State
  const [scrollY, setScrollY] = useState(0);
  const [headerStatus, setHeaderStatus] = useState(false);

  //* document가 렌더링 되었을 때 동작
  if (typeof document !== "undefined") {
    //* 헤더의 높이 감지
    const header = document.getElementById("header");
    const headerHeight = header?.getBoundingClientRect().height;

    //* scrollY 값에 따라서 setHeaderStatus 값을 바꾸는 함수
    const handleColor = () => {
      setScrollY(window.pageYOffset);
      console.log(scrollY);
      scrollY > headerHeight ? setHeaderStatus(true) : setHeaderStatus(false);
    };

    //* 이벤트 감지
    useEffect(() => {
      const watch = () => {
        window.addEventListener("scroll", handleColor);
      };
      handleColor();
      watch();
      return () => {
        window.removeEventListener("scroll", handleColor);
      };
    });
  }

  return (
    <header
      className={!headerStatus ? cx("header_wrapper", "opacity") : cx("header_wrapper", "nonopacity")}
      id="header"
    >
      <div>
        <Link href="/">
          <a className={styles.header_anchor}>너 닮 꽃</a>
        </Link>
        <Link href="/florist">
          <a className={styles.header_anchor}>플로리스트</a>
        </Link>
        <Link href="/custom">
          <a className={styles.header_anchor}>꽃다발커스텀</a>
        </Link>
      </div>
      <div>
        {isLogin ? (
          <>
            <Link href="/auth/mypage">
              <a className={styles.header_anchor}>마이페이지</a>
            </Link>
            <button className={styles.logout_button} onClick={onHandleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <a className={styles.header_anchor}>로그인</a>
            </Link>
            <Link href="/auth/signup">
              <a className={styles.header_anchor}>회원가입</a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
