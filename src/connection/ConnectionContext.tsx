import React, { useEffect, useState, createContext } from "react";
import Peer, { DataConnection } from "peerjs";

type Connection = {
  peer: Peer | null;
  incomingConnection: DataConnection;
  outgoingConnection: DataConnection;
  setPeer: Function;
  setIncomingConnection: Function;
  setOutgoingConnection: Function;
  messages: [];
};
export const ConnectionContext = createContext<Connection>({} as Connection);

export function ConnectionProvider(props: any) {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [
    incomingConnection,
    setIncomingConnection
  ] = useState<DataConnection | null>(null);
  const [
    outgoingConnection,
    setOutgoingConnection
  ] = useState<DataConnection | null>(null);

  const [messages, setMessages] = useState([""]);

  if (peer) {
    peer.on("open", id => console.log(`Opening new peer with id: ${id}`));
    peer.on("connection", (dataConnection: DataConnection) => {
      console.log("Incoming Connection From: ", dataConnection);
      // TODO: Handle incoming connection. Maybe another context???
      setIncomingConnection(dataConnection);
    });
    peer.on("error", err => {
      // TODO: Handle errors much more elegantly
      console.log("err", err);
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

  console.log("context");
  return (
    <ConnectionContext.Provider
      value={{
        peer,
        setPeer,
        incomingConnection, // currently unused
        outgoingConnection,
        setOutgoingConnection,
        messages
      }}
      {...props}
    />
  );
}
