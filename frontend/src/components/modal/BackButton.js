import styled from "styled-components";

const BackButtonStyle = styled.button`
  position: absolute;
  left: 20px;
  top: 20px;
`;
const BackButton = ({ onClick }) => {
  return (
    <BackButtonStyle type="button" onClick={() => onClick("detail")}>
      <i className="fa-solid fa-arrow-left"></i>
    </BackButtonStyle>
  );
};

export default BackButton;
