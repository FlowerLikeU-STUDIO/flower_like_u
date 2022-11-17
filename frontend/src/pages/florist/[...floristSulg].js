import HeaderItem from "@/components/common/HeaderItem";
import Feed from "@/components/feeds";
import Review from "@/components/review";
import useUser from "@/hooks/useUser";
import storage from "@/lib/utils/storage";
import { startChatting } from "@/store/actions/chat";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useSWR from "swr";
import { client } from "../api/client";
import { socketClient } from "../api/socketClient";

const ProfileTitleWrapper = styled.div`
  display: flex;
`;
const ProfileTitle = styled.div`
  width: 80%;
  max-width: 920px;
  display: flex;
  margin: 100px auto 0;
`;

const ProfileButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 920px;
  margin: 30px 0px;
  border-top: 3px solid #c8c8c8;
  position: relative;
`;

const ButtonLine = styled.div`
  margin: 0;
  border-top: 3px solid transparent;
  position: relative;
  top: -3px;
  margin: 0 50px;
  &.active {
    border-top: 3px solid #ffa7a5;
  }
`;

const TypeButtonStyle = styled.button`
  margin: 10px 0px;
  border: 3px solid #ffa7a5;
  width: 140px;
  font-size: 20px;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  &.active {
    background-color: #ffa7a5;
    color: #fff;
  }
  &:hover {
    background-color: #ffa7a5;
    color: #fff;
  }
  transition: 0.3s linear;
`;

const TitleButtonWrapper = styled.div`
  padding: 0px 20px 10px 20px;
`;

const ButtonStyle = styled.button`
  margin: 10px 0px;
  border: 3px solid #ffa7a5;
  width: 140px;
  font-size: 14px;
  padding: 8px 12px;
  margin: 0 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s linear;
  &:hover {
    background-color: #ffa7a5;
    color: #fff;
  }
`;

const Profile = ({ profileData, type, storeId }) => {
  const { data: isLogin } = useSWR("logIn", storage);
  const { user } = useUser();
  const [typeState, setType] = useState(type);
  const dispath = useDispatch();
  const changeType = (value) => {
    setType(value);
  };

  const openChat = () => {
    dispath(startChatting({ storeId: storeId }));
  };

  const handleCustomResgister = () => {};
  return (
    <>
      <ProfileTitleWrapper>
        <ProfileTitle>
          <HeaderItem isMyPage={false} {...profileData} type={"store"} />
          <TitleButtonWrapper>
            {isLogin && user ? (
              user.type === "consumer" ? (
                <div>
                  <ButtonStyle type="button" onClick={openChat}>
                    채팅 보내기
                  </ButtonStyle>
                  <ButtonStyle type="button" onClick={handleCustomResgister}>
                    커스텀 예약
                  </ButtonStyle>
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </TitleButtonWrapper>
        </ProfileTitle>
      </ProfileTitleWrapper>
      <ProfileButtonWrapper>
        <ButtonWrapper>
          <ButtonLine className={typeState === "feed" ? "active" : ""}>
            <TypeButtonStyle
              type="button"
              onClick={() => changeType("feed")}
              className={typeState === "feed" ? "active" : ""}
            >
              피드
            </TypeButtonStyle>
          </ButtonLine>
          <ButtonLine className={typeState === "review" ? "active" : ""}>
            <TypeButtonStyle
              type="button"
              onClick={() => changeType("review")}
              className={typeState === "review" ? "active" : ""}
            >
              후기
            </TypeButtonStyle>
          </ButtonLine>
        </ButtonWrapper>
      </ProfileButtonWrapper>
      {typeState === "feed" ? (
        <Feed storeId={storeId} />
      ) : (
        <Review storeId={storeId} />
      )}
    </>
  );
};

export default Profile;

export async function getServerSideProps({ params }) {
  const profileData = await axios(
    `https://www.flowerlikeu.com/api/user/store/${params.floristSulg[0]}`
  ).then((res) => res.data.storeInfo);
  return {
    props: {
      profileData: profileData,
      type: params.floristSulg[1],
      storeId: params.floristSulg[0],
    },
  };
}
