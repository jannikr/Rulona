import { ThunkDispatch } from "redux-thunk";

export type AppDispatch = ThunkDispatch<AppState, void, AppAction>;

export enum ActionType {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {}

export type AppAction = { type: ActionType };
