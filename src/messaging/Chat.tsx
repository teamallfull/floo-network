import React, { useContext, useState, useEffect } from "react";
import { ConnectionContext } from "../connection/ConnectionContext";
export function Chat(props: any) {
  const { connection } = useContext(ConnectionContext);
  const [message, setMessage] = useState("");
  const [connectionExists, setConnectionExists] = useState(false);

  useEffect(() => {
    if (connection) {
      setConnectionExists(true);
    } else setConnectionExists(false);
  }, [connection]);
  return (
    <>
      {connectionExists && (
        <>
          <input type="text" onChange={e => setMessage(e.target.value)} />
          <button type="button" onClick={() => connection.send(message)}>
            Send Message
          </button>
          <div className="chatbox" />
        </>
      )}
    </>
  );
}
