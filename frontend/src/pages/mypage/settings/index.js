import MySetting from "@/components/auth/MySetting";
import Button from "@/styles/common/Button";

const MyPageSettings = () => {
  return (
    <MySetting>
      <Button link="/mypage/settings/modify" size="setting-index" color="mypage-setting">
        내 정보수정
      </Button>
      <Button link="/mypage/settings/password" size="setting-index" color="mypage-setting">
        비밀번호 수정
      </Button>
      <Button link="/mypage/settings/withdrawal" size="setting-index" color="mypage-setting">
        회원탈퇴
      </Button>
    </MySetting>
  );
};

export default MyPageSettings;
