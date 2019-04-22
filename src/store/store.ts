import { createStore, combineReducers, applyMiddleware } from "redux";

import { chatReducer } from "./chat/reducers";

const rootReducer = combineReducers({
  chat: chatReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer, {});
  return store;
}
