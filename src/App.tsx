require("dotenv").config();
import React, {
  Component,
  useContext,
  useEffect,
  useLayoutEffect
} from "react";
import "./App.css";
import Peer from "peerjs";
import {
  ConnectionProvider,
  ConnectionContext
} from "./connection/ConnectionContext";
import { Connection } from "./connection/Connection";

interface SimpleMessage {
  author: string;
  message: string;
}

function App(props: any) {
  return (
    <div className="App">
      <ConnectionProvider>
        <div className="container">
          <Connection />
          <input type="text" onChange={e => () => {}} />
          <button type="button" onClick={() => {}}>
            Send Message
          </button>
          <button type="button" onClick={() => {}}>
            Call
          </button>
          <div className="chatbox" />
        </div>
      </ConnectionProvider>
    </div>
  );
}

export default App;
