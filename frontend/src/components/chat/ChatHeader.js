import styled from "styled-components";

const ChatHeaderWrapper = styled.div`
  height: 50px;
  border-radius: 30px 20px 0px 0px !important;
  /* border-bottom: 1px solid #eee; */
  padding: 20px 20px 0 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const HeaderItemWrapper = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  text-align: ${(props) => props.textAlign};
  justify-content: ${(props) => props.justify};
  display: flex;
  align-items: center;
  &.close {
    justify-content: end;
  }
`;

const ChatHeader = ({ left, center, right }) => {
  return (
    <ChatHeaderWrapper>
      <HeaderItemWrapper width={"30%"}>{left}</HeaderItemWrapper>
      <HeaderItemWrapper width={"40%"} justify={"center"}>
        {center}
      </HeaderItemWrapper>
      <HeaderItemWrapper width={"30%"} textAlign={"center"} className={"close"}>
        {right}
      </HeaderItemWrapper>
    </ChatHeaderWrapper>
  );
};

export default ChatHeader;
