export interface NetworkState {
  peerId: string | undefined;
  connectionId: string | undefined;
}

export const UPDATE_PEER_ID = "UPDATE_PEER_ID";
export const UPDATE_CONNECTION_ID = "UPDATE_CONNECTION_ID";

interface UpdatePeerIdAction {
  type: typeof UPDATE_PEER_ID;
  payload: string;
}

interface UpdateConnectionIdAction {
  type: typeof UPDATE_CONNECTION_ID;
  payload: string;
}

export type NetworkActionTypes = UpdatePeerIdAction | UpdateConnectionIdAction;
