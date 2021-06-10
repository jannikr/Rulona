import React from "react";
import { connect } from "react-redux";
import { selectPlace } from "../store/actions";
import { AppDispatch, SelectPlaceAction } from "../store/types";
import { Place } from "../types";
import PlaceTrend from "./PlaceTrend";

type Props = ReturnType<typeof mapDispatchToProps> & {
  place: Place;
};

const PlaceContainer: React.FC<Props> = (props) => {
  const { place, selectPlace } = props;

  return (
    <div
      onClick={(): void => {
        selectPlace(place);
      }}
    >
      <span>{place.name}</span>
      <span>
        <PlaceTrend trend={place.trend} />
      </span>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectPlace: (place: Place): SelectPlaceAction =>
    dispatch(selectPlace(place)),
});

export default connect(null, mapDispatchToProps)(PlaceContainer);
