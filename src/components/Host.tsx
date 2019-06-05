import React from "react";
import { useNetwork } from "../App";

function Host() {
  const [peerId, setPeerId] = React.useState("");
  const { networkState, createNewPeer } = useNetwork();

  function updatePeer() {
    createNewPeer(peerId);
    setPeerId("");
  }
  return (
    <>
      <div className="header">
        <h1>Floo Network</h1>
        {networkState.peerId ? (
          <h3>Your Peer Id is {networkState.peerId}</h3>
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

export default Host;
