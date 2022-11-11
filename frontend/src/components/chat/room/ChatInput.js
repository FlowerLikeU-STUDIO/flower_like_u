import axios from "axios";
import styled from "styled-components";

const { useState } = require("react");

const ChatInputWrapper = styled.div`
  background-color: #eee;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 16px;
`;

const ChatInputStyle = styled.input`
  background-color: transparent;
  outline: none;
  width: 90%;
  padding: 4px;
`;

const ChatInput = ({ sendMessage, sendImage }) => {
  const [chatInput, setChatInput] = useState("");

  const onChangeInput = (e) => {
    setChatInput(e.target.value);
  };

  const onSubmit = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      sendMessage(e.target.value);
      setChatInput("");
      return;
    }
  };

  return (
    <ChatInputWrapper>
      <ChatInputStyle
        placeholder={"메세지를 입력해 주세요."}
        value={chatInput}
        onKeyUp={onSubmit}
        onChange={onChangeInput}
      />
      {chatInput.length === 0 ? (
        <input type={"file"} accept="image/*" onChange={sendImage} />
      ) : (
        <button
          onClick={() => {
            console.log("adsf");
          }}
        >
          제출
        </button>
      )}
    </ChatInputWrapper>
  );
};

export default ChatInput;
