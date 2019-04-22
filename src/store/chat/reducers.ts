import { ChatState, ChatActionTypes, SEND_MESSAGE } from "./types";

const initialState: ChatState = {
  chats: []
};

export function chatReducer(
  state = initialState,
  action: ChatActionTypes
): ChatState {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        chats: [...state.chats, action.payload]
      };
    default:
      return state;
  }
}
