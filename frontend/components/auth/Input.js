import styled from "styled-components";

const InputStyle = styled.input`
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  width: 100%;
`;

const Input = ({ name, value, type, onChange }) => {
  return (
    <InputStyle
      name={name}
      value={value}
      onChange={onChange}
      type={type ? type : "text"}
    />
  );
};

export default Input;
