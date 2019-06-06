import React, { useEffect, useState, createContext } from "react";
import Peer, { DataConnection } from "peerjs";

type Connection = {
  peer: Peer | null;
  setPeer: Function;
};
export const ConnectionContext = createContext<Connection>({} as Connection);

export function ConnectionProvider(props: any) {
  const [peer, setPeer] = useState<Peer | null>(null);

  if (peer) {
    peer.on("open", id => console.log(`Opening new peer with id: ${id}`));
    peer.on("connection", dataConnection =>
      console.log("connected with details ", dataConnection)
    );
  }

  console.log("context");

  return (
    <ConnectionContext.Provider
      value={{
        peer,
        setPeer
      }}
      {...props}
    />
  );
}
