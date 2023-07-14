import { GoogleMap, Marker, Polygon, Polyline } from "@react-google-maps/api";
import React, { useId, useMemo } from "react";

type Coordinates = {
  longitude: number;
  latitude: number;
};

type MarkerCoordinates = Coordinates & {
  onLoad?: (marker: Marker["marker"]) => void;
};

export const DEFAULT_ADDRESS = {
  longitude: 2.3666048,
  latitude: 48.853107,
};

export interface GoogleMapsDirectionProps {
  center?: Coordinates;
  markers?: MarkerCoordinates[];
  polygons?: number[][][];
  paths?: { lat: number; lng: number }[][];
  zoom?: number;
  mapContainerStyle?: React.CSSProperties;
}

export function GoogleMapsDirection({
  center = DEFAULT_ADDRESS,
  markers,
  polygons,
  paths,
  zoom = 10,
  mapContainerStyle,
}: GoogleMapsDirectionProps): React.ReactElement {
  const id = useId();

  const polygonsLatLng = useMemo(
    () =>
      polygons &&
      polygons.map((polygon) =>
        polygon.map((pLatLng) => ({ lat: pLatLng[1], lng: pLatLng[0] })),
      ),
    [polygons],
  );

  const markersLatLng = useMemo(
    () =>
      markers &&
      markers.map((mLatLng) => ({
        lat: mLatLng.latitude,
        lng: mLatLng.longitude,
        onLoad: mLatLng.onLoad,
      })),
    [markers],
  );

  return (
    <div className="min-h-0 w-full">
      <GoogleMap
        id={id}
        mapContainerStyle={{
          width: "100%",
          height: "56.25vw",
          maxHeight: "300px",
          ...mapContainerStyle,
        }}
        center={{
          lng: center.longitude,
          lat: center.latitude,
        }}
        zoom={zoom}
      >
        {markersLatLng?.map((mLatLng) => (
          <Marker
            key={`marker-${mLatLng.lat}-${mLatLng.lng}-${Math.random() * 1000}`}
            position={mLatLng}
            onLoad={mLatLng?.onLoad}
          />
        ))}

        {polygonsLatLng?.length && (
          <Polygon
            paths={polygonsLatLng}
            options={{ strokeColor: "#15a1b7", fillColor: "#15a1b7" }}
          />
        )}

        {paths?.map((path) => {
          return (
            <Polyline
              key={`polyline-${path[0].lat}-${path[0].lng}-${
                Math.random() * 1000
              }`}
              path={path}
              options={{
                strokeColor: "#0000FF",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}
