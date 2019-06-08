import React, { useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../connection/ConnectionContext";

export function ChatBox() {
  const { messages } = useContext(ConnectionContext);
  // It may be a bad thing to set the default state to whatever the context has.
  // If there are performance hits, check this
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // maybe setChats is better here
    // maybe pushing to chats is best?
    console.log("in effect");
    setChats(messages);
  }, [messages]);

  function renderChats() {
    return messages.map(chat => <div>{chat}</div>);
  }

  return <div>{renderChats()}</div>;
}
