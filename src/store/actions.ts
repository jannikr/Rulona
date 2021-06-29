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
  DeleteFavouritePlaceAction,
  SetFavouritePlacesAction,
  AddFavouriteCategoryAction,
  DeleteFavouriteCategoryAction,
  SetFavouriteCategoriesAction,
  AppState,
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

export const setFavouritePlaces = (
  favouritePlaces: Place[]
): SetFavouritePlacesAction => {
  return {
    type: ActionType.SetFavouritePlaces,
    favouritePlaces,
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
  const favPlacesSet = new Set(
    JSON.parse(localStorage.getItem("favouritePlaces") || "[]")
  );
  favPlacesSet.add(place.id);
  localStorage.setItem(
    "favouritePlaces",
    JSON.stringify([...Array.from(favPlacesSet)])
  );
  return { type: ActionType.AddFavouritePlace, place };
};

export const deleteFavouritePlace = (
  place: Place
): DeleteFavouritePlaceAction => {
  const favPlacesSet = new Set(
    JSON.parse(localStorage.getItem("favouritePlaces") || "[]")
  );
  favPlacesSet.delete(place.id);
  localStorage.setItem(
    "favouritePlaces",
    JSON.stringify([...Array.from(favPlacesSet)])
  );
  return { type: ActionType.DeleteFavouritePlace, place };
};

export const fetchFavouritePlaces = () => {
  return (
    dispatch: AppDispatch,
    getState: () => AppState
  ): SetFavouritePlacesAction => {
    const places = getState().places;
    const favPlacesIds = JSON.parse(
      localStorage.getItem("favouritePlaces") || "[]"
    );
    const favouritePlaces = places.filter(
      (item) => favPlacesIds.indexOf(item.id) !== -1
    );
    return dispatch(setFavouritePlaces(favouritePlaces));
  };
};

export const setFavouriteCategories = (
  favouriteCategories: Category[]
): SetFavouriteCategoriesAction => {
  return {
    type: ActionType.SetFavouriteCategories,
    favouriteCategories,
  };
};

export const addFavouriteCategory = (
  category: Category
): AddFavouriteCategoryAction => {
  const favCategoriesSet = new Set(
    JSON.parse(localStorage.getItem("favouriteCategories") || "[]")
  );
  favCategoriesSet.add(category.id);
  localStorage.setItem(
    "favouriteCategories",
    JSON.stringify([...Array.from(favCategoriesSet)])
  );
  return { type: ActionType.AddFavouriteCategory, category };
};

export const deleteFavouriteCategory = (
  category: Category
): DeleteFavouriteCategoryAction => {
  const favCategoriesSet = new Set(
    JSON.parse(localStorage.getItem("favouriteCategories") || "[]")
  );
  favCategoriesSet.delete(category.id);
  localStorage.setItem(
    "favouriteCategories",
    JSON.stringify([...Array.from(favCategoriesSet)])
  );
  return { type: ActionType.DeleteFavouriteCategory, category };
};

export const fetchFavouriteCategories = () => {
  return (
    dispatch: AppDispatch,
    getState: () => AppState
  ): SetFavouriteCategoriesAction => {
    const categories = getState().categories;
    const favCategoriesIds = JSON.parse(
      localStorage.getItem("favouriteCategories") || "[]"
    );
    const favouriteCategories = categories.filter(
      (item) => favCategoriesIds.indexOf(item.id) !== -1
    );
    return dispatch(setFavouriteCategories(favouriteCategories));
  };
};
