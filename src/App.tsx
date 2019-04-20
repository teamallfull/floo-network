require("dotenv").config();
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Peer from "peerjs";

interface State {
  peer: Peer;
  connection: any;
  connectionId: string;
  message: string;
}
class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      peer: new Peer("jonnynabors", {
        debug: 3
      }),
      connection: "",
      connectionId: "",
      message: ""
    };
  }

  componentDidMount() {
    console.log("peer", this.state.peer);
    console.log("connection", this.state.connection);

    this.state.peer.on("connection", conn => {
      console.log(conn);
      console.log("connection from peer");

      conn.on("data", data => {
        // Will print 'hi!'
        console.log(data);
      });
    });
  }

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
      console.log("logging with message:", msg);

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
    })
  }

  sendMessage = () => {
    this.state.connection.send(this.state.message);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input
            type="text"
            onChange={e => this.handleConnectionId(e.target.value)}
          />
          <button type="button" onClick={this.openConnection}>
            Connect
          </button>
          <input type="text" onChange={e => this.updateMessage(e.target.value)}></input>
          <button type="button" onClick={this.sendMessage}>
            Send Message
          </button>
        </header>
      </div>
    );
  }
}

export default App;
