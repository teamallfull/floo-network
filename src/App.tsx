require("dotenv").config();
import React, { Component } from "react";
import "./App.css";
import Peer from "peerjs";
import { SimpleMessage } from "./types";

interface State {
  peer: Peer;
  peerId: string;
  connection: any;
  connectionId: string;
  message: string;
  videoSource: string;
  chats: SimpleMessage[];
}
class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      peer: new Peer("", {
        debug: 3
      }),
      peerId: "",
      connection: "",
      connectionId: "",
      message: "",
      videoSource: "",
      chats: []
    };
  }

  createPeer = () => {
    // TODO: Only create a peer that the user defines a name for
    // currently in the state declaration, we create one
    this.setState(
      {
        peer: new Peer(this.state.peerId, {
          debug: 3
        })
      },
      () => {
        this.state.peer.on("connection", conn => {
          console.log(conn);
          console.log(this.state.peer.id);
          this.setState({
            peerId: this.state.peer.id
          });

          conn.on("data", data => {
            let currentChats = this.state.chats;
            currentChats.push({
              author: "Them",
              message: data
            });
            this.setState({
              chats: currentChats
            });
          });

          this.state.peer.on("call", async incomingCall => {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
              video: false,
              audio: true
            });
            incomingCall.answer(mediaStream);
            incomingCall.on("stream", remoteStream => {
              console.log("remote stream", remoteStream);
            });
          });
        });
      }
    );
  };

  openConnection = () => {
    this.setState(
      {
        connection: this.state.peer.connect(this.state.connectionId)
      },
      this.connect
    );
  };

  connect = () => {
    this.state.connection.on("open", (msg: any) => {
      this.state.connection.send("hi!");
    });

    this.state.connection.on("error", (error: any) => {
      console.log(error);
    });
  };

  handleConnectionId = (connectionId: string) => {
    this.setState({
      connectionId
    });
  };

  updateMessage = (message: string) => {
    this.setState({
      message
    });
  };

  updatePeerId = (peerId: string) => {
    this.setState({ peerId });
  };

  sendMessage = () => {
    this.state.connection.send(this.state.message);
    let chats = this.state.chats;
    chats.push({
      author: "You",
      message: this.state.message
    });
    this.setState({
      message: ""
    });
  };

  call = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true
    });
    const audioCall = this.state.peer.call(
      this.state.connectionId,
      mediaStream
    );
    audioCall.on("stream", remoteStream => {
      // do stuff!
      console.log(remoteStream);
    });

    audioCall.on("error", error => {
      console.log(error);
    });
  };

  renderChatMessages = () => {
    return this.state.chats.map((chat, index) => (
      <div
        key={index}
        className={chat.author === "Them" ? "server-text" : "you-text"}
      >
        {chat.author}: {chat.message}
      </div>
    ));
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="header">
            <h1>Floo Network</h1>
            {this.state.peerId ? (
              <h3>Your Peer Id is {this.state.peerId}</h3>
            ) : (
              <h3>Please create a Peer Id</h3>
            )}
          </div>
          <div className="connection">
            <input
              type="text"
              placeholder="Create a Unique Peer Id"
              onChange={e => this.updatePeerId(e.target.value)}
            />
            <button type="button" onClick={this.createPeer}>
              Create Peer
            </button>
            <input
              type="text"
              placeholder="Enter Connection Id"
              onChange={e => this.handleConnectionId(e.target.value)}
            />
            <button type="button" onClick={this.openConnection}>
              Connect
            </button>
          </div>
          <input
            type="text"
            onChange={e => this.updateMessage(e.target.value)}
          />
          <button type="button" onClick={this.sendMessage}>
            Send Message
          </button>
          <button type="button" onClick={this.call}>
            Call
          </button>
          <div className="chatbox">{this.renderChatMessages()}</div>
        </div>
      </div>
    );
  }
}

export default App;
