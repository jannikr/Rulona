import React from "react";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Bookmark from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import { Place } from "../types";
import { AddFavouritePlaceAction, AppDispatch, AppState } from "../store/types";
import { connect } from "react-redux";
import { addFavouritePlace } from "../store/actions";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const AddFavourite: React.FC<Props> = (props) => {
  const { selectedPlace, addFavouritePlace, favouritePlaces } = props;
  if (!selectedPlace) return <></>;
  console.log(favouritePlaces);

  if (favouritePlaces.includes(selectedPlace)) {
    return (
      <>
        <IconButton
          onClick={(): void => {
            addFavouritePlace(selectedPlace);
          }}
        >
          <Bookmark />
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        <IconButton
          onClick={(): void => {
            addFavouritePlace(selectedPlace);
          }}
        >
          <BookmarkBorder />
        </IconButton>
      </>
    );
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { selectedPlace, favouritePlaces } = state;
  return { selectedPlace, favouritePlaces };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addFavouritePlace: (place: Place): AddFavouritePlaceAction =>
    dispatch(addFavouritePlace(place)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFavourite);
