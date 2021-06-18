import { ActionType, AppAction, AppState } from "./types";

export const initialState: AppState = {
  places: [],
  categories: [],
  rules: [],
  favouritePlaces: [],
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
      return { ...state, selectedPlace: action.place };
    }
    case ActionType.SetRules: {
      return { ...state, rules: action.rules };
    }
    case ActionType.SetPlaceInfo: {
      return { ...state, placeInfo: action.info };
    }
    case ActionType.AddFavouritePlace: {
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
    default:
      return state;
  }
};

export default reducer;
