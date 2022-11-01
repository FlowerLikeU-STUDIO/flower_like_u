import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";
import storage from "../../lib/utils/storage";
import UserHeaderItem from "./UserHeaderItem";

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

const Header = () => {
  const { data: isLogin } = useSWR("logIn", storage);
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
          <UserHeaderItem />
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
