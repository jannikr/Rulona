import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { AppAction, AppState } from "./types";

const middleware = [thunk];

let _store: Store<AppState, AppAction> | undefined;

const store = (): Store<AppState, AppAction> =>
  _store ??
  (_store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  ));

export default store;
