require("dotenv").config();
import React, { Component, useContext, useEffect } from "react";
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
  const context = useContext(ConnectionContext);
  useEffect(() => {
    console.log("effecting");
  }, [context.peer]);
  return (
    <div className="App">
      <ConnectionProvider>
        <div className="container">
          <div className="header">
            <h1>Floo Network</h1>
            {context.peer ? (
              <h3>Your Peer Id is {context.peer.id}</h3>
            ) : (
              <h3>Please Create a Peer</h3>
            )}
          </div>
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
