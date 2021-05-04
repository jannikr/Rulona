import { AppAction, AppState } from "./types";

export const initialState: AppState = {};

const reducer = (
  state: AppState = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
