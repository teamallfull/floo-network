import {
  NetworkActionTypes,
  UPDATE_PEER_ID,
  UPDATE_CONNECTION_ID
} from "./types";

export function updatePeerId(peerId: string): NetworkActionTypes {
  return {
    type: UPDATE_PEER_ID,
    payload: peerId
  };
}

export function updateConnectionId(connectionId: string): NetworkActionTypes {
  return {
    type: UPDATE_CONNECTION_ID,
    payload: connectionId
  };
}
