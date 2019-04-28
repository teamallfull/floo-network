import React from "react";

import { AppContext } from "../App";

export function Host() {
  const [peerId, setPeerId] = React.useState("");
  return (
    <AppContext.Consumer>
      {context => (
        <>
          <input
            type="text"
            placeholder="Create a Unique Peer Id"
            onChange={e => setPeerId(e.target.value)}
          />
          <button type="button" onClick={() => context.createPeer(peerId)}>
            Create Peer
          </button>
        </>
      )}
    </AppContext.Consumer>
  );
}
