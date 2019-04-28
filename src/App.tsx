require("dotenv").config();
import React, { Component } from "react";
import "./App.css";
import Peer from "peerjs";
import { SimpleMessage } from "./store/chat/types";
import ChatHistory from "./components/ChatHistory";
import { AppState } from "./store/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { sendMessage } from "./store/chat/actions";
import { Host } from "./components/Host";
import Connection from "./components/Connection";
import Header from "./components/Header";

interface Props {
  sendMessage: (message: SimpleMessage) => void;
  chats: SimpleMessage[];
}
const initialState = {
  peer: new Peer("", {
    debug: 3
  }),
  connection: "",
  message: "",
  createPeer: (peerName: string) => {
    initialState.peer = new Peer(peerName, {
      debug: 3
    });
  },
  createConnection: (connectionName: string) => {
    // @ts-ignore
    initialState.connection = initialState.peer.connect(connectionName);
  }
};

type State = Readonly<typeof initialState>;
export const AppContext = React.createContext(initialState);
class App extends Component<Props, State> {
  readonly state: State = initialState;
  constructor(props: any) {
    super(props);
  }

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

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <div className="container">
            <Header />
            <div className="connection" />
            <Host />
            <Connection />
            {/* <input
              type="text"
              onChange={e => this.updateMessage(e.target.value)}
            />
            <button type="button" onClick={this.sendMessage}>
              Send Message
            </button> */}
            <ChatHistory chats={this.props.chats} />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  chats: state.chat.chats
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendMessage: (value: SimpleMessage) => dispatch(sendMessage(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
