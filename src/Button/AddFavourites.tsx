import React from "react";
import Bookmark from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import { Place } from "../types";
import { AddFavouritePlaceAction, AppDispatch, AppState } from "../store/types";
import { connect } from "react-redux";
import { addFavouritePlace } from "../store/actions";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const AddFavourite: React.FC<Props> = (props) => {
  const { selectedPlace, addFavouritePlace } = props;
  if (!selectedPlace) return <></>;
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
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { selectedPlace } = state;
  return { selectedPlace };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addFavouritePlace: (place: Place): AddFavouritePlaceAction =>
    dispatch(addFavouritePlace(place)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFavourite);
