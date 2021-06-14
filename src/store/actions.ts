import { dynamicConstants } from "../constants";
import { Category, Place, PlaceInfo, Rule } from "../types";
import {
  ActionType,
  AppDispatch,
  SelectPlaceAction,
  SetPlacesAction,
  SetPlaceInfoAction,
  SetRulesAction,
  SetCategoriesAction,
  AddFavouritePlaceAction,
} from "./types";

export const selectPlace = (place: Place): SelectPlaceAction => {
  return {
    type: ActionType.SelectPlace,
    place,
  };
};

export const setPlaces = (places: Place[]): SetPlacesAction => {
  return {
    type: ActionType.SetPlaces,
    places,
  };
};

export const setCategories = (categories: Category[]): SetCategoriesAction => {
  return {
    type: ActionType.SetCategories,
    categories,
  };
};

export const setPlaceInfo = (info?: PlaceInfo): SetPlaceInfoAction => {
  return {
    type: ActionType.SetPlaceInfo,
    info,
  };
};

export const setRules = (rules: Rule[]): SetRulesAction => {
  return {
    type: ActionType.SetRules,
    rules,
  };
};

export const fetchPlaces = () => {
  return async (dispatch: AppDispatch): Promise<SetPlacesAction> => {
    const { API_URL } = dynamicConstants;
    const response = await fetch(`${API_URL}/places`);
    const places: Place[] = await response.json();
    return dispatch(setPlaces(places));
  };
};

export const fetchCategories = () => {
  return async (dispatch: AppDispatch): Promise<SetCategoriesAction> => {
    const { API_URL } = dynamicConstants;
    const response = await fetch(`${API_URL}/categories`);
    const categories: Category[] = await response.json();
    return dispatch(setCategories(categories));
  };
};

export const fetchPlaceInfo = (place: Place) => {
  return async (dispatch: AppDispatch): Promise<SetPlaceInfoAction> => {
    const { API_URL } = dynamicConstants;
    const response = await fetch(`${API_URL}/places/${place.id}`);
    const info: PlaceInfo = await response.json();
    return dispatch(setPlaceInfo(info));
  };
};

export const fetchRules = (place: Place) => {
  return async (dispatch: AppDispatch): Promise<SetRulesAction> => {
    let rules: Rule[] = [];
    const { API_URL } = dynamicConstants;
    const response = await fetch(`${API_URL}/places/${place.id}/rules`);
    response.status === 200 && (rules = await response.json());
    return dispatch(setRules(rules));
  };
};

export const addFavouritePlace = (place: Place): AddFavouritePlaceAction => {
  const favPlaces = JSON.parse(localStorage.getItem("favouritePlaces") || "[]");
  localStorage.setItem(
    "favouritePlaces",
    JSON.stringify([...favPlaces, place.id])
  );
  return { type: ActionType.AddFavouritePlace, place };
};
