require("dotenv").config();
import React, { useEffect, useMemo } from "react";
import "./App.css";
import Peer, { DataConnection } from "peerjs";
import { Host } from "./components/Host";
import Connection from "./components/Connection";
import { SimpleMessage } from "./Types";
import ChatHistory from "./components/ChatHistory";

type Network = {
  peer: Peer;
  connectionId: string;
  chats: SimpleMessage[];
  setConnectionId: Function;
  setChats: Function;
  connection: DataConnection;
};

export const NetworkContext = React.createContext<Network | undefined>(
  undefined
);

function NetworkProvider(props: any) {
  const [peer, setPeer] = React.useState(new Peer("", { debug: 3 }));
  const [connectionId, setConnectionId] = React.useState("");
  const [chats, setChats] = React.useState([]);
  const [connection, setConnection] = React.useState({});
  return (
    <NetworkContext.Provider
      value={{
        peer,
        connectionId,
        chats,
        setConnectionId,
        setChats,
        connection
      }}
      {...props}
    />
  );
}

export function useNetwork() {
  const context = React.useContext(NetworkContext);
  if (!context) {
    throw new Error(`useNetwork must be used within a NetworkProvider `);
  }
  let {
    peer,
    chats,
    connectionId,
    setConnectionId,
    setChats,
    connection
  } = context;
  const createNewPeer = (peerId: string) => {
    context.peer = new Peer(peerId, { debug: 3 });
    console.log("creating new peer");
  };

  const createConnection = (connectionId: string) => {
    setConnectionId(connectionId);
    if (context.peer) connection = context.peer.connect(connectionId);
  };

  const sendMessageToConnection = (message: string) => {
    if (context.peer.connections[connectionId]) {
      context.peer.connections[connectionId][0].send(message);
    }
  };

  const updateGlobalChat = (message: SimpleMessage) => {
    setChats([...chats, message]);
  };

  const updateGlobalChatForThem = (message: SimpleMessage) => {
    setChats([...chats, message]);
  };

  if (peer) console.log("so much stuff");
  peer.on("connection", conn => {
    setConnectionId(conn);
    updateGlobalChat({
      author: "Them",
      message: `You are now receiving messages from ${conn.peer}!`
    });
    conn.on("data", message => {
      updateGlobalChatForThem({
        author: "Them",
        message: `${message}!`
      });
    });
  });

  return {
    peer,
    createNewPeer,
    createConnection,
    chats,
    sendMessageToConnection,
    setConnectionId,
    updateGlobalChat
  };
}
function App() {
  // createPeer = () => {
  //   // TODO: Only create a peer that the user defines a name for
  //   // currently in the state declaration, we create one
  //   this.setState(
  //     {
  //       peer: new Peer(this.state.peerId, {
  //         debug: 3
  //       })
  //     },

  // openConnection = () => {
  //   this.setState(
  //     {
  //       connection: this.state.peer.connect(this.state.connectionId)
  //     },
  //     this.connect
  //   );
  // };

  // connect = () => {
  //   this.state.connection.on("open", (msg: any) => {
  //     this.state.connection.send("hi!");
  //   });

  //   this.state.connection.on("error", (error: any) => {
  //     console.log(error);
  //   });
  // };

  // handleConnectionId = (connectionId: string) => {
  //   this.setState({
  //     connectionId
  //   });
  // };

  // updateMessage = (message: string) => {
  //   this.setState({
  //     message
  //   });
  // };

  // updatePeerId = (peerId: string) => {
  //   this.setState({ peerId });
  // };

  // sendMessage = () => {
  //   this.state.connection.send(this.state.message);
  //   this.props.sendMessage({
  //     author: "You",
  //     message: this.state.message
  //   });
  // };

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
