import React, { useContext, useState, useEffect } from "react";
import { ConnectionContext } from "../connection/ConnectionContext";
export function Chat(props: any) {
  const { outgoingConnection } = useContext(ConnectionContext);
  const [message, setMessage] = useState("");
  const [connectionExists, setConnectionExists] = useState(false);

  useEffect(() => {
    if (outgoingConnection) {
      setConnectionExists(true);
    } else setConnectionExists(false);
  }, [outgoingConnection]);
  return (
    <>
      {connectionExists && (
        <>
          <input type="text" onChange={e => setMessage(e.target.value)} />
          <button
            type="button"
            onClick={() => outgoingConnection.send(message)}
          >
            Send Message
          </button>
          <div className="chatbox" />
        </>
      )}
    </>
  );
}
