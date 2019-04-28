import React from "react";
import { AppContext } from "../App";

const Connection = () => {
  const [connectionId, setConnectionId] = React.useState("");
  return (
    <AppContext.Consumer>
      {context => (
        <>
          <input
            type="text"
            placeholder="Enter Connection Id"
            onChange={e => setConnectionId(e.target.value)}
          />
          <button
            type="button"
            onClick={() => context.createConnection(connectionId)}
          >
            Connect
          </button>
        </>
      )}
    </AppContext.Consumer>
  );
};

export default Connection;
