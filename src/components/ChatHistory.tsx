import React, { useState } from "react";
import { useNetwork } from "../App";

const ChatHistory = () => {
  const [message, setMessage] = useState("");
  const { chats, sendMessageToConnection, updateGlobalChat } = useNetwork();
  function renderChatMessages() {
    return chats!.map((chat, index) => (
      <div
        key={index}
        className={chat.author === "Them" ? "server-text" : "you-text"}
      >
        {chat.author}: {chat.message}
      </div>
    ));
  }

  function sendMessage() {
    sendMessageToConnection(message);
    updateGlobalChat({
      author: "You",
      message
    });
  }

  return (
    <div>
      <div className="chatbox">{renderChatMessages()}</div>;
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="button" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default ChatHistory;
