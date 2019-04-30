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
  setChats: Function;
  setConnectionId: Function;
};

export const NetworkContext = React.createContext<Network | undefined>(
  undefined
);

function NetworkProvider(props: any) {
  const [peer, setPeer] = React.useState(new Peer("", { debug: 3 }));
  const [connectionId, setConnectionId] = React.useState("");
  const [chats, setChats] = React.useState([]);
  return (
    <NetworkContext.Provider
      value={{ peer, connectionId, chats, setChats, setConnectionId }}
      {...props}
    />
  );
}

export function useNetwork() {
  const context = React.useContext(NetworkContext);
  if (!context) {
    throw new Error(`useNetwork must be used within a NetworkProvider `);
  }
  let { peer, chats, connectionId, setChats, setConnectionId } = context;
  const createNewPeer = (peerId: string) => {
    context.peer = new Peer(peerId, { debug: 3 });
  };

  const createConnection = (connectionId: string) => {
    setConnectionId(connectionId);
    if (context.peer) context.peer.connect(connectionId);
  };

  const sendMessageToConnection = (message: string) => {
    if (context.peer.connections[connectionId]) {
      context.peer.connections[connectionId][0].send(message);
    }
  };

  useEffect(() => {
    console.log("in first effect");
    if (peer)
      peer.on("open", connectionId => {
        console.log(connectionId);
      });
  }, [peer, connectionId]);

  useEffect(() => {
    console.log("in second effect");
    if (peer)
      peer.on("connection", conn => {
        setConnectionId(conn);
        setChats([
          ...chats,
          {
            author: "Them",
            message: `You are now receiving messages from ${conn.peer}!`
          }
        ]);
        conn.on("data", message => {
          setChats([
            ...chats,
            {
              author: "Them",
              message: `You are connected with ${message}!`
            }
          ]);
        });
      });
  }, [peer]);

  return {
    peer,
    createNewPeer,
    createConnection,
    chats,
    setChats,
    sendMessageToConnection,
    setConnectionId
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
