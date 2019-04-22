import React from "react";
import { ChatState, SimpleMessage } from "../store/chat/types";
import { connect } from "react-redux";

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

const mapStateToProps = (state: ChatState) => ({
  chat: state.chats
});

export default connect(
  mapStateToProps,
  {}
)(ChatHistory);
