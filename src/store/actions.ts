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
  AppState,
  SetLastSearchedPlacesAction,
  DeselectPlaceAction,
} from "./types";

export const selectPlace = (place: Place): SelectPlaceAction => {
  return {
    type: ActionType.SelectPlace,
    place,
  };
};

export const deselectPlace = (): DeselectPlaceAction => {
  return {
    type: ActionType.DeselectPlace,
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

export const setLastSearchedPlaces = (
  searches: Place[]
): SetLastSearchedPlacesAction => {
  return { type: ActionType.SetLastSearchedPlaces, searches };
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

export const addLastSearchedPlace = (place: Place) => {
  return (dispatch: AppDispatch, getState: () => AppState): void => {
    dispatch({
      type: ActionType.AddLastSearchedPlace,
      place,
    });
    const searches = getState()
      .lastSearchedPlaces.map((place) => place.id)
      .slice(0, 10);
    localStorage.setItem("lastSearchedPlaces", JSON.stringify(searches));
  };
};

export const fetchLastSearchedPlaces = () => {
  return (
    dispatch: AppDispatch,
    getState: () => AppState
  ): SetLastSearchedPlacesAction => {
    const places = getState().places;
    const searchIds: string[] = JSON.parse(
      localStorage.getItem("lastSearchedPlaces") || "[]"
    );
    const searches: Place[] = searchIds.reduce<Place[]>((result, id) => {
      const place = places.find((place) => place.id === id);
      if (place) result.push(place);
      return result;
    }, []);
    return dispatch(setLastSearchedPlaces(searches));
  };
};
