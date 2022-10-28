import styled from "styled-components";

const LableStyle = styled.label`
  display: flex;
  width: 70%;
  max-width: 500px;
  justify-content: center;
  margin-top: 20px;
  & span {
    width: 30%;
  }
`;
const InputStyle = styled.input`
  outline: none;
  border: none;
  font-size: 1rem;
  border-bottom: 3px solid #ccc;
  width: 70%;
`;

const Input = ({ text, value, onChange, name, type }) => {
  return (
    <LableStyle>
      <span>{text}</span>
      <InputStyle
        value={value}
        onChange={onChange}
        name={name}
        autoComplete={"off"}
        type={type}
      />
    </LableStyle>
  );
};

export default Input;

Input.defaultProps = {
  type: "text",
};
