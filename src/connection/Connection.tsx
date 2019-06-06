import { ConnectionContext } from "./ConnectionContext";
import React, { useContext, useState, useEffect } from "react";

export function Connection() {
  const { setPeer, peer } = useContext(ConnectionContext);
  const [localPeerId, setLocalPeerId] = useState("");
  const [connectionId, setConnectionId] = useState("");

  return (
    <div className="connection">
      <input
        type="text"
        placeholder="Create a Unique Peer Id"
        onChange={e => setLocalPeerId(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setPeer(() => new Peer(localPeerId, { debug: 3 }));
        }}
      >
        Create Peer
      </button>
      <input
        type="text"
        placeholder="Enter Connection Id"
        onChange={e => setConnectionId(e.target.value)}
      />
      <button type="button" onClick={() => peer!.connect(connectionId)}>
        Connect
      </button>
    </div>
  );
}
