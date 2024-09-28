import { Box, Typography } from "@mui/material";
import { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useCallback, useState } from "react";
import { useInput } from "react-admin";
import Map, { Marker } from "react-map-gl";

const MapInput = () => {
  const { field: fieldLatitude } = useInput({ source: "latitude" });
  const { field: fieldLongitude } = useInput({ source: "longitude" });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: fieldLatitude.value,
    longitude: fieldLongitude.value,
  });

  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      const { lng, lat } = event.lngLat;
      setMarkerPosition({ latitude: lat, longitude: lng });
      fieldLatitude.onChange(lat);
      fieldLongitude.onChange(lng);
    },
    [fieldLatitude, fieldLongitude],
  );

  return (
    <Box width="100%">
      <Map
        initialViewState={{
          longitude: markerPosition.longitude,
          latitude: markerPosition.latitude,
          zoom: 13,
        }}
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onClick={onMapClick}
      >
        <Marker
          longitude={markerPosition.longitude}
          latitude={markerPosition.latitude}
        />
      </Map>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="body1">
          Latitude: {markerPosition.latitude.toFixed(6)}
        </Typography>
        <Typography variant="body1">
          Longitude: {markerPosition.longitude.toFixed(6)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MapInput;
