import React from "react";
import { AppContext } from "../App";

const Header = () => {
  return (
    <AppContext.Consumer>
      {context => (
        <div className="header">
          <h1>Floo Network</h1>
          {context.peer.id ? (
            <h3>Your Peer Id is {context.peer.id}</h3>
          ) : (
            <h3>Please create a Peer Id</h3>
          )}
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default Header;
