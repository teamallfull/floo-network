import { ConnectionContext } from "./ConnectionContext";
import React, { useContext, useState } from "react";

export function Connection() {
  const { peer, setPeer } = useContext(ConnectionContext);
  const [peerId, setPeerId] = useState("");
  return (
    <div className="connection">
      <input
        type="text"
        placeholder="Create a Unique Peer Id"
        onChange={e => setPeerId(e.target.value)}
      />
      <button type="button" onClick={() => setPeer(peerId)}>
        Create Peer
      </button>
      {/* <input
        type="text"
        placeholder="Enter Connection Id"
        onChange={e => this.handleConnectionId(e.target.value)}
      />
      <button type="button" onClick={this.openConnection}>
        Connect
      </button> */}
    </div>
  );
}
