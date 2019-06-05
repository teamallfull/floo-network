require("dotenv").config();
import React, { useReducer, useState, useEffect, useMemo } from "react";
import "./App.css";
import Peer from "peerjs";
import Connection from "./components/Connection";
import ChatHistory from "./components/ChatHistory";
import Host from "./components/Host";
import { store } from ".";
import { networkReducer } from "./store/network/reducers";
import {
  UPDATE_PEER_ID,
  UPDATE_CONNECTION_ID,
  NetworkState,
  NetworkActionTypes
} from "./store/network/types";
import { chatReducer } from "./store/chat/reducers";
import { ChatState, ChatActionTypes } from "./store/chat/types";

type Network = {
  peer: Peer;
  networkState: NetworkState;
  networkDispatch: React.Dispatch<NetworkActionTypes>;
  chatState: ChatState;
  chatDispatch: React.Dispatch<ChatActionTypes>;
  setPeer: React.Dispatch<React.SetStateAction<Peer | undefined>>;
};

export const NetworkContext = React.createContext<Network | undefined>(
  undefined
);

function NetworkProvider(props: any) {
  const [peer, setPeer] = useState(undefined);
  const [networkState, networkDispatch] = useReducer(
    networkReducer,
    store.getState().network
  );
  const [chatState, chatDispatch] = useReducer(
    chatReducer,
    store.getState().chat
  );

  const value = useMemo(() => {
    return {
      peer,
      setPeer,
      networkState,
      networkDispatch,
      chatState,
      chatDispatch
    };
  }, [peer, networkState, chatState]);
  return <NetworkContext.Provider value={value} {...props} />;
}

export function useNetwork() {
  const context = React.useContext(NetworkContext);

  if (!context) {
    throw new Error(`useNetwork must be used within a NetworkProvider `);
  }

  let {
    peer,
    setPeer,
    networkState,
    networkDispatch,
    chatState,
    chatDispatch
  } = context;
  console.log("in network");
  const createNewPeer = (peerId: string) => {
    networkDispatch({ type: UPDATE_PEER_ID, payload: peerId });
    setPeer(new Peer(peerId, { debug: 3 }));
    console.log("creating new peer", peerId);
  };

  const createConnection = (connectionId: string) => {
    if (peer) {
      networkDispatch({ type: UPDATE_CONNECTION_ID, payload: connectionId });
      peer.connect(connectionId);
    }
  };

  const sendMessageToConnection = (message: string) => {
    let connectionId = networkState.connectionId;
    if (connectionId) {
      if (peer.connections[connectionId]) {
        chatDispatch({
          type: "SEND_MESSAGE",
          payload: {
            author: "You",
            message
          }
        });
        peer.connections[connectionId][0].send(message);
      }
    }
  };

  // TODO: memoize this?
  useEffect(() => {
    console.log("in effect");
    if (peer) {
      peer.on("error", err => {
        console.log("error", err);
      });
      peer.on("connection", conn => {
        chatDispatch({
          type: "SEND_MESSAGE",
          payload: {
            author: "Them",
            message: `You are now receiving messages from ${conn.peer}!`
          }
        });
        conn.on("data", message => {
          chatDispatch({
            type: "SEND_MESSAGE",
            payload: {
              author: "Them",
              message: `${message}`
            }
          });
        });
      });
    }
  }, [peer]);

  return {
    createNewPeer,
    createConnection,
    sendMessageToConnection,
    networkState,
    chatState
  };
}
function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="connection" />
        <NetworkProvider>
          <Host />
          <Connection />
          <ChatHistory />
        </NetworkProvider>
      </div>
    </div>
  );
}

export default App;
