import SuccessAlert from "@/lib/SuccessAlert";
import storage from "@/lib/utils/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR, { mutate } from "swr";

const HeaderWrapper = styled.div`
  padding: ${(props) => props.padding};
  display: flex;
  background-color: #fffbeb;
  justify-content: space-between;
`;

const HeaderAnchor = styled.a`
  color: #445b0f;
  margin: 10px;
  cursor: pointer;
`;

const LogOutButton = styled.button`
  color: #445b0f;
  font-size: 1rem;
`;

const Header = () => {
  const { data: isLogin } = useSWR("logIn", storage);
  const router = useRouter();
  const onHandleLogout = () => {
    window.sessionStorage.removeItem("ACCESS_TOKEN");
    window.sessionStorage.removeItem("REFRESH_TOKEN");
    mutate("logIn", null);
    SuccessAlert("로그아웃 되었습니다.");
    router.push("/");
  };
  return (
    <HeaderWrapper padding={"24px 32px"}>
      <div>
        <Link href="/">
          <HeaderAnchor>너 닮 꽃</HeaderAnchor>
        </Link>
        <Link href="/florist">
          <HeaderAnchor>플로리스트</HeaderAnchor>
        </Link>
        <Link href="/custom">
          <HeaderAnchor>꽃다발커스텀</HeaderAnchor>
        </Link>
      </div>
      <div>
        {isLogin ? (
          <>
            <Link href="/auth/mypage">
              <HeaderAnchor>마이페이지</HeaderAnchor>
            </Link>
            <LogOutButton onClick={onHandleLogout}>로그아웃</LogOutButton>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <HeaderAnchor>로그인</HeaderAnchor>
            </Link>
            <Link href="/auth/signup">
              <HeaderAnchor>회원가입</HeaderAnchor>
            </Link>
          </>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
