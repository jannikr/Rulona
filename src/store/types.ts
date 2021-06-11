import { ThunkDispatch } from "redux-thunk";
import { Category, Place, PlaceInfo, Rule } from "../types";

export type AppDispatch = ThunkDispatch<AppState, void, AppAction>;

export enum ActionType {
  SetPlaces = "SetPlaces",
  SetCategories = "SetCategories",
  SelectPlace = "SelectPlace",
  SetRules = "SetRules",
  SetPlaceInfo = "SetPlaceInfo",
}

export interface AppState {
  places: Place[];
  categories: Category[];
  selectedPlace?: Place;
  rules: Rule[];
  placeInfo?: PlaceInfo;
}

export interface SetPlacesAction {
  type: ActionType.SetPlaces;
  places: Place[];
}

export interface SetCategoriesAction {
  type: ActionType.SetCategories;
  categories: Category[];
}

export interface SelectPlaceAction {
  type: ActionType.SelectPlace;
  place: Place;
}

export interface SetRulesAction {
  type: ActionType.SetRules;
  rules: Rule[];
}

export interface SetPlaceInfoAction {
  type: ActionType.SetPlaceInfo;
  info?: PlaceInfo;
}

export type AppAction =
  | SetPlacesAction
  | SetCategoriesAction
  | SelectPlaceAction
  | SetRulesAction
  | SetPlaceInfoAction;
