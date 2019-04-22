import React from "react";
import { SimpleMessage } from "../store/chat/types";

interface Props {
  chats: SimpleMessage[];
}

const ChatHistory = (props: Props) => {
  function renderChatMessages() {
    return props.chats.map((chat, index) => (
      <div
        key={index}
        className={chat.author === "Them" ? "server-text" : "you-text"}
      >
        {chat.author}: {chat.message}
      </div>
    ));
  }

  return <div className="chatbox">{renderChatMessages()}</div>;
};

export default ChatHistory;
