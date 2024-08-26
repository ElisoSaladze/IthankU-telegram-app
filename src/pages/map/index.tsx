import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import MapSvg from 'src/assets/icons/map.svg';
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';

import FilterDrawer from 'src/components/filter-drawer';
import { getUsersByLocation, LocationQueryParams, User } from '~/api/users';

// const GOOGLE_MAP_API_KEY = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDsf_MC31bfKI8JwasA5WebPrCl2TDqoHc',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]);

  const [radius, setRadius] = useState(1000); // Default to 1 km = 1000 meters

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);

      const newCircle = new google.maps.Circle({
        strokeColor: '#21A54D',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#21A54D',
        fillOpacity: 0.35,
        map,
        center: userLocation,
        radius,
      });
      setCircle(newCircle);

      map.addListener('center_changed', () => {
        const newCenter = map.getCenter();
        if (newCenter && newCircle) {
          newCircle.setCenter(newCenter);
        }
      });
    },
    [userLocation, radius],
  );

  // TODO!
  const fetchNearbyUsers = useCallback(
    async (lat: number, lng: number) => {
      const locationParams: LocationQueryParams = {
        latitude: lat,
        longitude: lng,
        radius: radius / 1000,
      };

      try {
        const users = await getUsersByLocation(locationParams);
        setNearbyUsers(users.users);
      } catch (error) {
        console.error('Error fetching nearby users:', error);
      }
    },
    [radius],
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
          console.error('Error getting user location:', error);
          setLocationLoaded(true);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocationLoaded(true);
    }
  }, []);

  const handleRadiusChange = (_event: Event, newValue: number | number[]) => {
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
    <Stack height={1} overflow="hidden">
      <AppBar>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              fontWeight={500}
              variant="h6"
              component="div"
              sx={{ textAlign: 'center', color: 'black', fontSize: 20 }}
            >
              People nearby
            </Typography>
          </Box>
          <FilterDrawer radius={radius} onRadiusChange={handleRadiusChange} />
        </Toolbar>
      </AppBar>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {nearbyUsers.map((user) => (
          <UserMarker key={user._id} user={user} />
        ))}
      </GoogleMap>
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
        url: user.picture ?? '',
        scaledSize: new google.maps.Size(40, 40),
      }}
    />
  );
};

export default MapPage;
