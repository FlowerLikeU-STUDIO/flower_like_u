import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Input from "../../components/auth/Input";
import useInput from "../../hooks/useInput";
import FailsAlert from "../../lib/FailAlert";
import SuccessAlert from "../../lib/SuccessAlert";
import { mutate } from "swr";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 68px);
`;

const LoginContent = styled.div`
  display: flex;
  width: 70%;
  max-width: 920px;
  min-width: 720px;
  min-height: 520px;
  height: 520px;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.78px 33.4px rgba(0, 0, 0, 0.053),
    0px 22.34px 17.87px rgba(0, 0, 0, 0.0417),
    0px 12.52px 10.02px rgba(0, 0, 0, 0.035),
    0px 6.65px 5.32px rgba(0, 0, 0, 0.03), 0px 2.21px 2.77px rgba(0, 0, 0, 0.03);
  @media screen and (max-width: 556px) {
    flex-direction: column;
    min-width: 500px;
    min-height: 600px;
  }
`;

const LoginContentLeft = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 556px) {
    width: 100%;
    padding: 0px;
    height: auto;
    justify-content: flex-start;
    padding-top: 20px;
  }
`;

const LoginContentRight = styled.div`
  width: 70%;
  display: flex;
  height: 100%;
  padding: 30px 10px 0px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 556px) {
    justify-content: flex-start;
    width: 100%;
    padding-top: 20px;
    padding: 0px;
  }
`;

const LoginButton = styled.button`
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  width: ${(props) => props.width};
  max-width: 500px;
`;

const SocialButton = styled.button`
  position: relative;
  width: ${(props) => props.width};
  height: 42px;
  margin: ${(props) => props.margin};
  background-color: #fee601;
  max-width: 500px;
`;
const loginData = {
  userId: "",
  password: "",
};
const Login = () => {
  const [loginInfo, setLoginInfo, onChange] = useInput(loginData);
  const router = useRouter();
  const onHandleSubmit = async () => {
    if (loginInfo.userId.length === 0 || loginInfo.password.length === 0) {
      FailsAlert("로그인 정보를 정확히 입력해 주세요.");
      return;
    }
    const { data, status } = await axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response);
    if (status === 200) {
      window.sessionStorage.setItem("ACCESS_TOKEN", "test.jwt.token");
      window.sessionStorage.setItem("REFRESH_TOKEN", "test.refresh.token");
      SuccessAlert("로그인 되었습니다.");
      mutate("logIn", true);
      router.push("/");
    }
  };
  return (
    <LoginWrapper>
      <LoginContent>
        <LoginContentLeft>
          로그인
          <Image src="/auth/happyBtte.jpeg" width={180} height={230} />
        </LoginContentLeft>
        <LoginContentRight>
          <Input
            text={"아이디"}
            value={loginInfo.userId}
            onChange={onChange}
            name={"userId"}
          />

          <Input
            text={"비밀번호"}
            value={loginInfo.password}
            onChange={onChange}
            name={"password"}
            type={"password"}
          />

          <LoginButton
            onClick={onHandleSubmit}
            width={"70%"}
            bgColor={"#96C62B"}
            color={"#fff"}
            padding={"12px 20px"}
            margin={"20px 0 0 0"}
          >
            로그인
          </LoginButton>
          <SocialButton width={"70%"} margin={"20px 0 0 0"}>
            <Image
              src={"/auth/kakao_login_medium.png"}
              width={175}
              height={40}
            />
          </SocialButton>
          <div>계정이 없으신가요?</div>
        </LoginContentRight>
      </LoginContent>
    </LoginWrapper>
  );
};

export default Login;
