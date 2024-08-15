import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MapSvg from "src/assets/icons/map.svg";

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const MapPage = () => {
  console.log(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);

      // Add the circle to the map
      const newCircle = new google.maps.Circle({
        strokeColor: "#21A54D",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#21A54D",
        fillOpacity: 0.35,
        map,
        center: userLocation,
        radius: 500,
      });
      setCircle(newCircle);

      // Add event listener to update the circle's position when the map center changes
      map.addListener("center_changed", () => {
        const newCenter = map.getCenter();
        if (newCenter && newCircle) {
          newCircle.setCenter(newCenter);
        }
      });
    },
    [userLocation]
  );

  const onUnmount = useCallback(() => {
    if (circle) {
      circle.setMap(null);
    }
    setMap(null);
  }, [circle]);

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
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={userLocation}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <img
        src={MapSvg}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </GoogleMap>
  );
};

export default MapPage;
