import { ConnectionContext } from "./ConnectionContext";
import React, { useContext, useState, useEffect } from "react";
import Peer from "peerjs";

export function Connection() {
  const { setPeer, peer } = useContext(ConnectionContext);
  const [peerId, setPeerId] = useState("");
  const [peerCreated, setPeerCreated] = useState(false);
  const [connectionId, setConnectionId] = useState("");

  useEffect(() => {
    if (peer && peer.id) {
      setPeerCreated(true);
    } else setPeerCreated(false);
  }, [peer]);
  return (
    <div className="connection">
      <div className="header">
        <h1>Floo Network</h1>
        {peer ? (
          <h3>Your Peer Id is {peer.id}</h3>
        ) : (
          <h3>Please Create a Peer</h3>
        )}
      </div>
      <input
        type="text"
        placeholder="Create a Unique Peer Id"
        onChange={e => setPeerId(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setPeer(() => new Peer(peerId, { debug: 3 }));
        }}
      >
        Create Peer
      </button>
      {peerCreated && (
        <>
          <input
            type="text"
            placeholder="Enter Connection Id"
            onChange={e => setConnectionId(e.target.value)}
          />
          <button type="button" onClick={() => peer!.connect(connectionId)}>
            Connect
          </button>
        </>
      )}
    </div>
  );
}
