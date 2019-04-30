import React from "react";
import { useNetwork } from "../App";

const Connection = () => {
  const [connectionId, setConnectionId] = React.useState("");
  const { createConnection } = useNetwork();

  function updateConnection() {
    createConnection(connectionId);
    setConnectionId("");
  }
  return (
    <>
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
  );
};

export default Connection;
