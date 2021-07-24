import React from "react";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Bookmark from "@material-ui/icons/Bookmark";
import { Place } from "../types";
import {
  AddFavouritePlaceAction,
  DeleteFavouritePlaceAction,
  AppDispatch,
  AppState,
} from "../store/types";
import { connect } from "react-redux";
import { addFavouritePlace, deleteFavouritePlace } from "../store/actions";
import Favourite from "./Favourite";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    place: Place;
  };

const FavouritePlace: React.FC<Props> = (props) => {
  const {
    place,
    addFavouritePlace,
    deleteFavouritePlace,
    favouritePlaces,
  } = props;

  return (
    <Favourite
      element={place}
      favourites={favouritePlaces}
      addFavourite={addFavouritePlace}
      deleteFavourite={deleteFavouritePlace}
      addIcon={<BookmarkBorder />}
      deleteIcon={<Bookmark />}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { favouritePlaces } = state;
  return { favouritePlaces };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addFavouritePlace: (place: Place): AddFavouritePlaceAction =>
    dispatch(addFavouritePlace(place)),
  deleteFavouritePlace: (place: Place): DeleteFavouritePlaceAction =>
    dispatch(deleteFavouritePlace(place)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavouritePlace);
