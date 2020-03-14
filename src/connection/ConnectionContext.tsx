import React, { useState, createContext } from "react";
import Peer, { DataConnection, MediaConnection } from "peerjs";

type Connection = {
  peer: Peer | null;
  incomingConnection: DataConnection;
  outgoingConnection: DataConnection;
  setPeer: Function;
  setIncomingConnection: Function;
  setOutgoingConnection: Function;
  startCall: Function;
  answerCall: Function;
  call: MediaConnection;
  mediaStream: MediaStream;
  messages: [];
  callEstablished: boolean;
};
export const ConnectionContext = createContext<Connection>({} as Connection);

export function ConnectionProvider(props: any) {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [callEstablished, setCallEstablished] = useState(false);
  const [
    incomingConnection,
    setIncomingConnection
  ] = useState<DataConnection | null>(null);
  const [
    outgoingConnection,
    setOutgoingConnection
  ] = useState<DataConnection | null>(null);

  const [messages, setMessages] = useState([""]);

  const [call, setCall] = useState<MediaConnection | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>(
    undefined
  );

  // Handler for initiating a call with another user
  async function startCall() {
    // TODO: This check should probably be `peer && outgoingConnection`
    if (peer) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });

        peer.call(outgoingConnection?.peer!, stream);
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (peer) {
    peer.on("open", id => {
      console.log(`Opening new peer with id: ${id}`);
    });
    peer.on("connection", (dataConnection: DataConnection) => {
      console.log("Incoming Connection From: ", dataConnection);
      // TODO: Handle incoming connection. Maybe another context???
      setIncomingConnection(dataConnection);
    });
    peer.on("error", err => {
      // TODO: Handle errors much more elegantly, like showing them to the user and clearing them
      console.log("err", err);
    });

    peer.on("call", call => {
      if (call.open === false) {
        console.log("answering call");
        call.answer(mediaStream);
        setCall(call);
      }
    });
  }

  if (incomingConnection) {
    incomingConnection.on("data", (data: any) => {
      setMessages([...messages, data]);
    });
  }

  if (outgoingConnection) {
    console.log(
      "an outgoing connection is established with",
      outgoingConnection
    );
    outgoingConnection.on("data", (data: any) => {
      setMessages([...messages, data]);
    });
  }

  if (call) {
    call.on("stream", stream => {
      setMediaStream(stream);
    });
  }

  return (
    <ConnectionContext.Provider
      value={{
        peer,
        setPeer,
        incomingConnection, // currently unused
        outgoingConnection,
        setOutgoingConnection,
        messages,
        startCall,
        call,
        callEstablished,
        mediaStream
      }}
      {...props}
    />
  );
}
