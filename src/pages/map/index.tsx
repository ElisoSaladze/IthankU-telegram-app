import { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import MapSvg from "src/assets/icons/map.svg";
import { getUsersByLocation } from "src/api/listing";
import { LocationQueryParams, User } from "src/api/listing/types";
import {
  AppBar,
  Box,
  IconButton,
  Modal,
  Slider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const MapPage = () => {
  console.log(import.meta.env.VITE_GOOGLE_MAP_API_KEY);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [radius, setRadius] = useState(1000); // Default to 1 km = 1000 meters

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);

      const newCircle = new google.maps.Circle({
        strokeColor: "#21A54D",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#21A54D",
        fillOpacity: 0.35,
        map,
        center: userLocation,
        radius,
      });
      setCircle(newCircle);

      map.addListener("center_changed", () => {
        const newCenter = map.getCenter();
        if (newCenter && newCircle) {
          newCircle.setCenter(newCenter);
        }
      });
    },
    [userLocation, radius]
  );

  const fetchNearbyUsers = useCallback(
    async (lat: number, lng: number) => {
      const locationParams: LocationQueryParams = {
        latitude: lat,
        longitude: lng,
        radius: radius / 1000, // Convert to km for API request
      };
      try {
        const users = await getUsersByLocation(locationParams);
        setNearbyUsers(users.users);
      } catch (error) {
        console.error("Error fetching nearby users:", error);
      }
    },
    [radius]
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

  const handleRadiusChange = (event: Event, newValue: number | number[]) => {
    const radiusInKm = newValue as number;
    const radiusInMeters = radiusInKm * 1000;
    setRadius(radiusInMeters);
    if (circle) {
      circle.setRadius(radiusInMeters);
    }
  };

  if (!isLoaded || !locationLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Stack height={"100%"} overflow={"hidden"}>
      <AppBar>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              fontWeight={500}
              variant="h6"
              component="div"
              sx={{ textAlign: "center", color: "black", fontSize: 20 }}
            >
              People nearby
            </Typography>
          </Box>
          <IconButton
            onClick={() => setModalOpen(true)}
            sx={{
              backgroundColor: "info.main",
              color: "white",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "info.main",
              },
            }}
            size="small"
          >
            <FilterAltOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={userLocation}
        zoom={17}
        onLoad={onLoad}
        onDragEnd={async () => {
          const newCenter = map?.getCenter();
          fetchNearbyUsers(newCenter?.lat() || 0, newCenter?.lng() || 0);
        }}
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
        {nearbyUsers.map((user) => (
          <UserMarker key={user._id} user={user} />
        ))}
      </GoogleMap>

      <SettingsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        radius={radius}
        onRadiusChange={handleRadiusChange}
      />
    </Stack>
  );
};

const UserMarker: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Marker
      position={{
        lat: user.location?.coordinates?.[1] || 0,
        lng: user.location?.coordinates?.[0] || 0,
      }}
      icon={{
        url: user.picture ?? "",
        scaledSize: new google.maps.Size(40, 40),
      }}
    />
  );
};

const SettingsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  radius: number;
  onRadiusChange: (event: Event, newValue: number | number[]) => void;
}> = ({ open, onClose, radius, onRadiusChange }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="radius-slider-title"
    aria-describedby="radius-slider-description"
  >
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 2,
      }}
    >
      <Typography id="radius-slider-title" variant="h6">
        Set Radius (km)
      </Typography>
      <Slider
        value={radius / 1000}
        onChange={onRadiusChange}
        min={1}
        max={25}
        step={1}
        valueLabelDisplay="auto"
        aria-labelledby="radius-slider-title"
      />
    </Box>
  </Modal>
);

export default MapPage;
