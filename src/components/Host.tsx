import React from "react";
import { useNetwork } from "../App";

export function Host() {
  const [peerId, setPeerId] = React.useState("");
  const { peer, createNewPeer } = useNetwork();

  function updatePeer() {
    createNewPeer(peerId);
    setPeerId("");
  }
  return (
    <>
      <div className="header">
        <h1>Floo Network</h1>
        {peer ? (
          <h3>Your Peer Id is {peer!.id}</h3>
        ) : (
          <h3>Please create a Peer Id</h3>
        )}
      </div>
      <input
        type="text"
        value={peerId}
        placeholder="Create a Unique Peer Id"
        onChange={e => setPeerId(e.target.value)}
      />
      <button type="button" onClick={() => updatePeer()}>
        Create Peer
      </button>
    </>
  );
}
