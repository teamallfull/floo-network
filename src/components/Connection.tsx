import React from "react";
import { useNetwork } from "../App";

const Connection = () => {
  const [connectionId, setConnectionId] = React.useState("");
  const { networkState, createConnection } = useNetwork();

  function updateConnection() {
    createConnection(connectionId);
    setConnectionId("");
  }
  return (
    <>
      {networkState.peerId ? (
        <>
          {networkState.connectionId ? (
            <h3>You are connected to {networkState.connectionId}</h3>
          ) : (
            <h3>Open a remote connection below</h3>
          )}
          <input
            type="text"
            value={connectionId}
            placeholder="Enter Connection Id"
            onChange={e => setConnectionId(e.target.value)}
          />
          <button type="button" onClick={updateConnection}>
            Connect
          </button>
        </>
      ) : (
        <h3>Please create a unique Peer Id above</h3>
      )}
    </>
  );
};

export default Connection;
