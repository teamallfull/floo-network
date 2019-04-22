export interface SimpleMessage {
  author: string;
  message: string;
}

export interface ChatState {
  chats: SimpleMessage[];
}
export const SEND_MESSAGE = "SEND_MESSAGE";

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: SimpleMessage;
}

export type ChatActionTypes = SendMessageAction;
