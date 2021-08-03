import { ThunkDispatch } from "redux-thunk";
import { Category, Place, PlaceInfo, Rule } from "../types";

export type AppDispatch = ThunkDispatch<AppState, void, AppAction>;

export enum ActionType {
  SetPlaces = "SetPlaces",
  SetCategories = "SetCategories",
  SelectPlace = "SelectPlace",
  DeselectPlace = "DeletePlace",
  SetRules = "SetRules",
  SetPlaceInfo = "SetPlaceInfo",
  AddFavouritePlace = "AddFavouritePlace",
  DeleteFavouritePlace = "DeleteFavouritePlace",
  SetFavouritePlaces = "SetFavouritePlaces",
  AddLastSearchedPlace = "AddLastSearchedPlace",
  SetLastSearchedPlaces = "SetLastSearchedPlaces",
  AddFavouriteCategory = "AddFavouriteCategory",
  DeleteFavouriteCategory = "DeleteFavouriteCategory",
  SetFavouriteCategories = "SetFavouriteCategories",
}

export interface AppState {
  places: Place[];
  categories: Category[];
  selectedPlace?: Place;
  rules: Rule[];
  placeInfo?: PlaceInfo;
  favouritePlaces: Place[];
  lastSearchedPlaces: Place[];
  favouriteCategories: Category[];
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

export interface AddFavouritePlaceAction {
  type: ActionType.AddFavouritePlace;
  place: Place;
}

export interface DeleteFavouritePlaceAction {
  type: ActionType.DeleteFavouritePlace;
  place: Place;
}

export interface SetFavouritePlacesAction {
  type: ActionType.SetFavouritePlaces;
  favouritePlaces: Place[];
}

export interface AddLastSearchedPlaceAction {
  type: ActionType.AddLastSearchedPlace;
  place: Place;
}

export interface SetLastSearchedPlacesAction {
  type: ActionType.SetLastSearchedPlaces;
  searches: Place[];
}

export interface AddFavouriteCategoryAction {
  type: ActionType.AddFavouriteCategory;
  category: Category;
}

export interface DeleteFavouriteCategoryAction {
  type: ActionType.DeleteFavouriteCategory;
  category: Category;
}

export interface SetFavouriteCategoriesAction {
  type: ActionType.SetFavouriteCategories;
  favouriteCategories: Category[];
}

export type AppAction =
  | SetPlacesAction
  | SetCategoriesAction
  | SelectPlaceAction
  | SetRulesAction
  | SetPlaceInfoAction
  | AddFavouritePlaceAction
  | DeleteFavouritePlaceAction
  | SetFavouritePlacesAction
  | AddLastSearchedPlaceAction
  | SetLastSearchedPlacesAction
  | AddFavouriteCategoryAction
  | DeleteFavouriteCategoryAction
  | SetFavouriteCategoriesAction;
