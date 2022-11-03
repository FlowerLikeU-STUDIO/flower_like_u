import MySetting from "@/components/auth/MySetting";
import Button from "@/components/common/Button";
import useUser from "@/hooks/useUser";

const MyPageSettings = () => {
  const { user } = useUser();

  return (
    <>
      {user && (
        <MySetting>
          <Button
            link={user.type === "consumer" ? "/mypage/settings/modify" : "/mypage/settings/modify-store"}
            size="setting-index"
            color="mypage-setting"
          >
            내 정보수정
          </Button>
          <Button link="/mypage/settings/password" size="setting-index" color="mypage-setting">
            비밀번호 수정
          </Button>
          <Button link="/mypage/settings/withdrawal" size="setting-index" color="mypage-setting">
            회원탈퇴
          </Button>
        </MySetting>
      )}
    </>
  );
};

export default MyPageSettings;
