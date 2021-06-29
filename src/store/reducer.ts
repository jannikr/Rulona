import { ActionType, AppAction, AppState } from "./types";

export const initialState: AppState = {
  places: [],
  categories: [],
  rules: [],
  favouritePlaces: [],
  favouriteCategories: [],
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

    default:
      return state;
  }
};

export default reducer;
