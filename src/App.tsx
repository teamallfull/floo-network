require("dotenv").config();
import React from "react";
import "./App.css";
import { ConnectionProvider } from "./connection/ConnectionContext";
import { Connection } from "./connection/Connection";
import { Chat } from "./messaging/Chat";
import { ChatBox } from "./messaging/ChatBox";

function App() {
  return (
    <div className="App">
      <ConnectionProvider>
        <div className="container">
          <Connection />
          <Chat />
          <ChatBox />
        </div>
      </ConnectionProvider>
    </div>
  );
}

export default App;
