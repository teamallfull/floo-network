import { SimpleMessage, ChatActionTypes, SEND_MESSAGE } from "./types";

export function sendMessage(message: SimpleMessage): ChatActionTypes {
  return {
    type: SEND_MESSAGE,
    payload: message
  };
}
