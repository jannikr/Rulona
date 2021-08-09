import {
  GoogleMap,
  LoadScript,
  Polygon as MapsPolygon,
} from "@react-google-maps/api";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { MAPS_API_KEY } from "../constants";
import { AppState } from "../store/types";
import { ColorVariables, Coordinate, Polygon, PolygonType } from "../types";
import { rootStyles } from "../utils";
import Route from "./Route";

type Props = ReturnType<typeof mapStateToProps>;

const Map: React.FC<Props> = (props) => {
  const { restrictions, routeBoundary } = props;
  const [boundaries, setBoundaries] = useState<Polygon[]>([]);
  const [map, setMap] = useState<google.maps.Map>();

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const germanyCenter = useMemo<Coordinate>(
    () => ({
      lat: 51.1657,
      lng: 10.4515,
    }),
    []
  );

  const defaultZoom = 7;
  const boundaryOptions = {
    fillColor: rootStyles.getPropertyValue(ColorVariables.Red),
    fillOpacity: 0.1,
    strokeColor: rootStyles.getPropertyValue(ColorVariables.Red),
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  useEffect(() => {
    if (!restrictions) {
      setBoundaries([]);
      return;
    }

    const boundaries: Polygon[] = [];
    for (const restriction of restrictions) {
      if (!restriction.polygon) continue;
      switch (restriction.polygon.type) {
        case PolygonType.Polygon: {
          boundaries.push(restriction.polygon.coordinates);
          break;
        }
        case PolygonType.MultiPolygon: {
          boundaries.push(...restriction.polygon.coordinates);
          break;
        }
      }
    }
    setBoundaries(boundaries);
  }, [restrictions]);

  useEffect(() => {
    if (!map) return;
    if (!routeBoundary) {
      map?.setCenter(germanyCenter);
      map?.setZoom(defaultZoom);
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(routeBoundary.northeast);
    bounds.extend(routeBoundary.southwest);
    map?.fitBounds(bounds);
  }, [map, routeBoundary, germanyCenter]);

  return (
    <LoadScript googleMapsApiKey={MAPS_API_KEY || ""}>
      <GoogleMap
        onLoad={setMap}
        mapContainerStyle={containerStyle}
        center={germanyCenter}
        zoom={defaultZoom}
      >
        {boundaries.map((boundary, index) => (
          <MapsPolygon
            key={`polygon-${index}-${boundary[0][0].lat}-${boundary[0][0].lng}`}
            paths={boundary}
            options={boundaryOptions}
          />
        ))}
        <Route zIndex={boundaryOptions.zIndex + 1} />
      </GoogleMap>
    </LoadScript>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { restrictions, routeBoundary } = state;
  return { restrictions, routeBoundary };
};

export default connect(mapStateToProps)(Map);
