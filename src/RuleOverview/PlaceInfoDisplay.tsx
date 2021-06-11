import React from "react";
import { PlaceInfo } from "../types";

interface Props {
  placeInfo?: PlaceInfo;
}

const PlaceInfoDisplay: React.FC<Props> = (props) => {
  const { placeInfo } = props;
  if (!placeInfo) return <></>;
  return (
    <>
      <p>Inzidenz: {placeInfo.incidence}</p>
      <p>
        {`Die offiziellen Regeln für ${placeInfo.name} lassen sich `}
        <a href={placeInfo.website}>hier</a>
        {` einsehen.`}
      </p>
    </>
  );
};

export default PlaceInfoDisplay;
