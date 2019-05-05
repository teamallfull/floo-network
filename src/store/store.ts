import { createStore, combineReducers, applyMiddleware } from "redux";

import { chatReducer } from "./chat/reducers";
import { networkReducer } from "./network/reducers";

const rootReducer = combineReducers({
  chat: chatReducer,
  network: networkReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer, {});
  return store;
}
