import styled from "styled-components";

const ChatHeaderWrapper = styled.div`
  border-radius: 30px 30px 0px 0px !important;
  /* border-bottom: 1px solid #eee; */
  padding: 20px 2px 0 4px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const HeaderItemWrapper = styled.div`
  width: ${(props) => props.width};
  text-align: ${(props) => props.textAlign};
`;

const ChatHeader = ({ left, center, right }) => {
  return (
    <ChatHeaderWrapper>
      <HeaderItemWrapper width={"30%"}>{left}</HeaderItemWrapper>
      <HeaderItemWrapper width={"50%"}>{center}</HeaderItemWrapper>
      <HeaderItemWrapper width={"20%"} textAlign={"center"}>
        {right}
      </HeaderItemWrapper>
    </ChatHeaderWrapper>
  );
};

export default ChatHeader;
