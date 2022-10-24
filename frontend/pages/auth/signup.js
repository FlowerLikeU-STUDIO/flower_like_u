import Image from "next/image";
import styled from "styled-components";
import Flex from "../../components/layouts/Flex";
import Input from "../../components/signup/Input";
import useInput from "../../hooks/useInput";

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 68px);
`;

const SignUpContent = styled.div`
  display: flex;
  width: 90%;
  min-height: 80%;
  max-width: 1100px;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.78px 33.4px rgba(0, 0, 0, 0.053),
    0px 22.34px 17.87px rgba(0, 0, 0, 0.0417),
    0px 12.52px 10.02px rgba(0, 0, 0, 0.035),
    0px 6.65px 5.32px rgba(0, 0, 0, 0.03), 0px 2.21px 2.77px rgba(0, 0, 0, 0.03);
  @media screen and (max-width: 556px) {
    flex-direction: column;
  }
`;

const SignUpContentLeft = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px 0 0 90px;
  @media screen and (max-width: 556px) {
    width: 100%;
    padding: 0px;
    margin-top: 50px;
    margin-bottom: 50px;
    height: auto;
  }
`;

const SignUpContentRight = styled.div`
  width: 70%;
  display: flex;
  padding: 30px 10px 0px 0px;
  margin-left: 80px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 556px) {
    width: 100%;
    margin-left: 30px;
    padding: 0px;
  }
`;

const ButtonStyle = styled.button`
  display: flex;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background: #96c62b;
  margin: 0 0 0 10px;
`;

const signupData = {
  userId: "",
  password: "",
  passowrd2: "",
  userName: "",
  email: "",
  emailCertificationNumber: "",
};
const signupDateList = [
  {
    labelText: "아이디",
    htmlFor: "userId",
    valueKey: "userId",
    name: "userId",
    buttonAbsece: true,
    buttonText: "중복검사",
    validationCheck: true,
  },
  {
    labelText: "비밀번호",
    htmlFor: "password",
    valueKey: "password",
    name: "password",
    type: "password",
    validationCheck: true,
  },
  {
    labelText: "비밀번호 확인",
    htmlFor: "password2",
    valueKey: "password2",
    name: "password2",
    type: "password",
    validationCheck: true,
  },
  {
    labelText: "이름",
    htmlFor: "userName",
    valueKey: "userName",
    name: "userName",
  },

  {
    labelText: "이메일",
    htmlFor: "email",
    valueKey: "email",
    name: "email",
    buttonAbsece: true,
    buttonText: "이메일 인증",
  },
  {
    labelText: "인증번호",
    htmlFor: "emailCertificationNumber",
    valueKey: "emailCertificationNumber",
    name: "emailCertificationNumber",
    buttonAbsece: true,
    buttonText: "인증번호 확인",
    validationCheck: true,
  },
];
const SignUp = () => {
  const [signupInfo, setSignupInfo, onChange] = useInput(signupData);

  const onHandleSubmit = () => {};
  return (
    <SignUpWrapper>
      <SignUpContent>
        <SignUpContentLeft>
          회원가입
          <Image src="/auth/happyBtte.jpeg" width={180} height={230} />
        </SignUpContentLeft>
        <SignUpContentRight>
          {signupDateList.map((item, idx) => (
            <Item
              key={item.labelText + idx}
              labelText={item.labelText}
              htmlFor={item.htmlFor}
              Input={
                <Input
                  onChange={onChange}
                  value={signupInfo[item.valueKey]}
                  name={item.name}
                  type={item.type}
                />
              }
              ResultText={""}
              children={
                item.buttonAbsece ? (
                  <SignUp.Button text={item.buttonText} />
                ) : undefined
              }
            />
          ))}
          <Item />
          <Flex>
            <input id="business" type={"checkbox"} />
            <label htmlFor="business">사업자(판매자)</label>
          </Flex>
          <SignUp.Button
            text={"회원가입"}
            onClick={onHandleSubmit}
            type={"submit"}
          />
        </SignUpContentRight>
      </SignUpContent>
    </SignUpWrapper>
  );
};

const Item = ({ labelText, Input, ResultText, children }) => {
  return (
    <Flex
      col
      justifyContent={"space-around"}
      alignItems={"center"}
      margin={"0 0 30px 0"}
    >
      <Flex>
        <label>
          <span>{labelText}</span>
          {Input}
        </label>
        {/* {ResultText ? ResultText : <></>} */}
      </Flex>
      <Flex width={"30%"}>{children}</Flex>
    </Flex>
  );
};

const Button = ({ text, onClick, type }) => {
  return (
    <ButtonStyle type={type} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
};

SignUp.Item = Item;
SignUp.Button = Button;
Button.defaultProps = {
  type: "button",
};
export default SignUp;
