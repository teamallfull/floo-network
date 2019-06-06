import React, { useEffect, useState, createContext } from "react";
import Peer, { DataConnection } from "peerjs";

type Connection = {
  peer: Peer | null;
  connection: DataConnection;
  setPeer: Function;
  setConnection: Function;
};
export const ConnectionContext = createContext<Connection>({} as Connection);

export function ConnectionProvider(props: any) {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [connection, setConnection] = useState<DataConnection | null>(null);

  if (peer) {
    peer.on("open", id => console.log(`Opening new peer with id: ${id}`));
    peer.on("connection", (dataConnection: DataConnection) => {
      console.log("Incoming Connection From: ", dataConnection);
      // TODO: Handle incoming connection. Maybe another context???
    });
    peer.on("error", err => {
      // TODO: Handle errors much more elegantly
      console.log("err", err);
    });
  }

  console.log("context");
  return (
    <ConnectionContext.Provider
      value={{
        peer,
        setPeer,
        connection,
        setConnection
      }}
      {...props}
    />
  );
}
