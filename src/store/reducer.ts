import { ActionType, AppAction, AppState } from "./types";

export const initialState: AppState = {
  places: [],
  categories: [],
  rules: [],
  favouritePlaces: [],
  lastSearchedPlaces: [],
  favouriteCategories: [],
  restrictions: [],
  route: undefined,
  routeBoundary: undefined,
};

const reducer = (
  state: AppState = initialState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case ActionType.SetPlaces: {
      return { ...state, places: action.places };
    }
    case ActionType.SetCategories: {
      return { ...state, categories: action.categories };
    }
    case ActionType.SelectPlace: {
      if (!action.place) return { ...state, selectedPlace: undefined };
      if (state.selectedPlace?.id === action.place.id) return state;
      return { ...state, selectedPlace: action.place };
    }
    case ActionType.SetRules: {
      return { ...state, rules: action.rules };
    }
    case ActionType.SetPlaceInfo: {
      return { ...state, placeInfo: action.info };
    }
    case ActionType.AddFavouritePlace: {
      const idAlreadyExists =
        state.favouritePlaces.indexOf(action.place) !== -1;
      if (idAlreadyExists) return state;
      return {
        ...state,
        favouritePlaces: [...state.favouritePlaces, action.place],
      };
    }
    case ActionType.DeleteFavouritePlace: {
      return {
        ...state,
        favouritePlaces: state.favouritePlaces.filter(function (place) {
          return place.id !== action.place.id;
        }),
      };
    }
    case ActionType.SetFavouritePlaces: {
      return { ...state, favouritePlaces: action.favouritePlaces };
    }
    case ActionType.AddLastSearchedPlace: {
      const previousPlaces = state.lastSearchedPlaces.filter(
        (place) => place !== action.place
      );
      const lastSearchedPlaces = [action.place, ...previousPlaces];
      return {
        ...state,
        lastSearchedPlaces,
      };
    }
    case ActionType.SetLastSearchedPlaces: {
      return { ...state, lastSearchedPlaces: action.searches };
    }

    case ActionType.SetFavouriteCategories: {
      return { ...state, favouriteCategories: action.favouriteCategories };
    }
    case ActionType.AddFavouriteCategory: {
      const idAlreadyExists =
        state.favouriteCategories.indexOf(action.category) !== -1;
      if (idAlreadyExists) return state;
      return {
        ...state,
        favouriteCategories: [...state.favouriteCategories, action.category],
      };
    }
    case ActionType.DeleteFavouriteCategory: {
      return {
        ...state,
        favouriteCategories: state.favouriteCategories.filter(function (
          category
        ) {
          return category.id !== action.category.id;
        }),
      };
    }
    case ActionType.SetRestrictions: {
      return {
        ...state,
        restrictions: action.restrictions,
      };
    }
    case ActionType.SetRoute: {
      return {
        ...state,
        route: action.route,
      };
    }
    case ActionType.SetRouteBoundary: {
      return {
        ...state,
        routeBoundary: action.routeBoundary,
      };
    }
    default:
      return state;
  }
};

export default reducer;
