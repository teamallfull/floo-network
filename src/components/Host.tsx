import React from "react";
import { useNetwork } from "../App";
import { AppState } from "../store/store";
import { Dispatch } from "redux";
import { updatePeerId } from "../store/network/actions";
import { connect } from "react-redux";
import { NetworkState } from "../store/network/types";

interface Props {
  peerId: string | undefined;
  updatePeerId: (value: string) => void;
}
function Host(props: Props) {
  const [peerId, setPeerId] = React.useState("");
  const { createNewPeer } = useNetwork();

  function updatePeer() {
    createNewPeer(peerId);
    props.updatePeerId(peerId);
    setPeerId("");
  }
  return (
    <>
      <div className="header">
        <h1>Floo Network</h1>
        {props.peerId ? (
          <h3>Your Peer Id is {props.peerId}</h3>
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

const mapStateToProps = (state: AppState) => ({
  peerId: state.network.peerId
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePeerId: (value: string) => dispatch(updatePeerId(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Host);
