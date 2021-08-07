import { dynamicConstants } from "../constants";
import {
  Category,
  Place,
  PlaceInfo,
  Polygon,
  RestrictedPlace,
  RouteBoundary,
  RoutingResponse,
  Rule,
} from "../types";
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
  SetLastSearchedPlacesAction,
  SetRestrictionsAction,
  SetRouteAction,
  SetOriginAction,
  SetDestinationAction,
} from "./types";

export const setFirstVisit = (firstVisit: boolean): SetFirstVisitAction => ({
  type: ActionType.SetFirstVisit,
  firstVisit,
});

export const selectPlace = (place: Place): SelectPlaceAction => {
  return {
    type: ActionType.SelectPlace,
    place,
  };
};

export const deselectPlace = (): SelectPlaceAction => ({
  type: ActionType.SelectPlace,
  place: undefined,
});

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

export const setRestrictions = (
  restrictions: RestrictedPlace[]
): SetRestrictionsAction => ({
  type: ActionType.SetRestrictions,
  restrictions,
});

export const resetRestrictions = (): SetRestrictionsAction => ({
  type: ActionType.SetRestrictions,
  restrictions: [],
});

export const setRoute = (
  origin: Place,
  destination: Place,
  route: Polygon,
  routeBoundary: RouteBoundary
): SetRouteAction => ({
  type: ActionType.SetRoute,
  origin,
  destination,
  route,
  routeBoundary,
});

export const resetRoute = (): SetRouteAction => ({
  type: ActionType.SetRoute,
  origin: undefined,
  destination: undefined,
  route: undefined,
  routeBoundary: undefined,
});

export const setOrigin = (origin: Place | undefined): SetOriginAction => ({
  type: ActionType.SetOrigin,
  origin,
});

export const setDestination = (
  destination: Place | undefined
): SetDestinationAction => ({
  type: ActionType.SetDestination,
  destination,
});

export const fetchRestrictions = (origin: Place, destination: Place) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const response = await fetch(`${dynamicConstants.API_URL}/routing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: origin.id,
        destination: destination.id,
      }),
    });
    const body: RoutingResponse = await response.json();
    dispatch(setRestrictions(body.restrictedPlaces));
    dispatch(setRoute(origin, destination, body.route, body.routeBoundary));
  };
};
