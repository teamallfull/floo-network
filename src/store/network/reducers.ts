import {
  NetworkState,
  NetworkActionTypes,
  UPDATE_PEER_ID,
  UPDATE_CONNECTION_ID
} from "./types";

const initialState: NetworkState = {
  peerId: undefined,
  connectionId: undefined
};

export function networkReducer(
  state = initialState,
  action: NetworkActionTypes
): NetworkState {
  switch (action.type) {
    case UPDATE_PEER_ID:
      return {
        ...state,
        peerId: action.payload
      };
    case UPDATE_CONNECTION_ID:
      return {
        ...state,
        connectionId: action.payload
      };
    default:
      return state;
  }
}
