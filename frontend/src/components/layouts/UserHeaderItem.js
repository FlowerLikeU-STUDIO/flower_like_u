import Link from "next/link";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import SuccessAlert from "../../lib/SuccessAlert";
import { useRouter } from "next/router";
import { mutate } from "swr";

const LogOutButton = styled.button`
  color: #445b0f;
  font-size: 1rem;
`;

const HeaderAnchor = styled.a`
  color: #445b0f;
  margin: 10px;
  cursor: pointer;
`;
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
          <Link
            href={
              user.type === "seller" ? "/mypage/feeds" : "/mypage/reservation"
            }
          >
            <HeaderAnchor>마이페이지</HeaderAnchor>
          </Link>
          <LogOutButton onClick={onHandleLogout}>로그아웃</LogOutButton>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserHeaderItem;
