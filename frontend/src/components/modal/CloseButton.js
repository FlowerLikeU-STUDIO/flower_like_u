import { modalClose } from "@/store/reducers/modal";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const CloseButtonStyle = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;
const CloseButton = () => {
  const dispatch = useDispatch();
  return (
    <CloseButtonStyle type="button" onClick={() => dispatch(modalClose())}>
      <i className="fa-solid fa-xmark"></i>
    </CloseButtonStyle>
  );
};

export default CloseButton;
