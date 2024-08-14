import { useState, useEffect, useCallback } from "react";
import {
  Circle,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import MapSvg from "src/assets/icons/map.svg";

const GOOGLE_MAP_API_KEY = import.meta.env.GOOGLE_MAP_API_KEY;

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  const [locationLoaded, setLocationLoaded] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationLoaded(true);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationLoaded(true);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocationLoaded(true);
    }
  }, []);

  if (!isLoaded || !locationLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100vh" }}
      center={userLocation}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Circle
        center={userLocation}
        radius={5000000000000} // 5km in meters
      />
      {
        <img
          src={MapSvg}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      }
    </GoogleMap>
  );
};

export default MapPage;
