import styled from "styled-components";

const ContentFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 720px) {
    height: 100%;
    justify-content: start;
  }
`;

const InputStyle = styled.input`
  display: flex;
  padding: 10px;
  outline: none;
  border-bottom: 1px solid #c8c8c8;
  width: 80%;
  display: inline-block;
  margin: 10px 0px;
`;

const RegisterButton = styled.button`
  width: 140px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffa7a5;
  color: white;
  cursor: pointer;
  &.absolute {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
`;

const TextAreaStyle = styled.textarea`
  padding: 10px;
  resize: none;
  outline: none;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  width: 80%;
  height: 200px;
  margin: 10px 0px;
  @media screen and (max-width: 720px) {
    height: 200px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: end;
  position: relative;
`;

const ContentForm = ({ content, onChange, registerFeed }) => {
  return (
    <ContentFormWrapper>
      <InputStyle
        name={"title"}
        value={content.title}
        placeholder={"제목"}
        onChange={onChange}
      />
      <InputStyle
        name={"cost"}
        value={content.cost}
        placeholder={"가격"}
        onChange={onChange}
      />
      <TextAreaStyle
        name={"desc"}
        value={content.desc}
        placeholder={"상세내용"}
        onChange={onChange}
      />

      <ButtonWrapper>
        <RegisterButton onClick={registerFeed}>등록하기</RegisterButton>
      </ButtonWrapper>
    </ContentFormWrapper>
  );
};

export default ContentForm;
