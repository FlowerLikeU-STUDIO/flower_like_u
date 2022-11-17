import FeedRegister from "@/components/modal/contents/FeedRegister";
import styled from "styled-components";

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const RegisterContentWrapper = styled.div`
  width: 80%;
  max-width: 920px;
  height: 520px;
  background-color: #fff;
  box-shadow: 0 0 4px rgb(0 0 0 / 10%);
  @media screen and (max-width: 720px) {
    height: 800px;
  }
`;

const Register = () => {
  return (
    <RegisterWrapper>
      <RegisterContentWrapper>
        <FeedRegister />
      </RegisterContentWrapper>
    </RegisterWrapper>
  );
};

export default Register;
