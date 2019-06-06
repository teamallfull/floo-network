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
