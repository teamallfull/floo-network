require("dotenv").config();
import React, { Component, useEffect } from "react";
import "./App.css";
import Peer from "peerjs";
import { Host } from "./components/Host";

type Network = {
  peer: Peer;
};

export const NetworkContext = React.createContext<Partial<Network>>({});
function NetworkProvider(props: any) {
  const [peer, setPeer] = React.useState(new Peer("", { debug: 3 }));

  return <NetworkContext.Provider value={{ peer }} {...props} />;
}

export function useNetwork() {
  const context = React.useContext(NetworkContext);
  if (!context) {
    throw new Error(`useNetwork must be used within a NetworkProvider `);
  }
  let { peer } = context;
  const createNewPeer = (peerId: string) => {
    context.peer = new Peer(peerId, { debug: 3 });
  };

  useEffect(() => {
    if (peer)
      peer.on("open", connectionId => {
        console.log(connectionId);
      });
  });

  useEffect(() => {
    if (peer) peer.on("connection", conn => console.log(conn));
  });

  return {
    peer,
    createNewPeer
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
  //     () => {
  //       this.state.peer.on("connection", conn => {
  //         console.log(conn);
  //         console.log(this.state.peer.id);
  //         this.setState({
  //           peerId: this.state.peer.id
  //         });

  //         conn.on("data", data => {
  //           this.props.sendMessage({
  //             author: "Them",
  //             message: data
  //           });
  //         });

  //         this.state.peer.on("call", async incomingCall => {
  //           const mediaStream = await navigator.mediaDevices.getUserMedia({
  //             video: false,
  //             audio: true
  //           });
  //           incomingCall.answer(mediaStream);
  //           incomingCall.on("stream", remoteStream => {
  //             console.log("remote stream", remoteStream);
  //           });
  //         });
  //       });
  //     }
  //   );
  // };

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
        </NetworkProvider>
      </div>
    </div>
  );
}

export default App;
