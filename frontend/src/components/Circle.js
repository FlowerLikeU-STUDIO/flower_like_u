import styled from "styled-components";

const CirclrStyle = styled.div`
  background-color: #fffbeb;
  width: 200vw;
  height: 100vw;
  left: -50vw;
  top: -65vw;
  position: absolute;
  border-radius: 100%;
  z-index: -1;
`;
const Circle = () => {
  return <CirclrStyle />;
};

export default Circle;
