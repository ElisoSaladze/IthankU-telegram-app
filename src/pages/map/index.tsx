import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import MapSvg from 'src/assets/icons/map.svg';
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import FilterDrawer from 'src/components/filter-drawer';
import { getUsersByLocation, MapUser } from '~/api/users';
import { useQuery } from '@tanstack/react-query';

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDsf_MC31bfKI8JwasA5WebPrCl2TDqoHc',
  });

  const searchParams = new URLSearchParams(location.search);
  const initialRadius = Number(searchParams.get('radius')) * 1000 || 1000;
  const shade = searchParams.get('shade') || undefined;
  const hashtag = searchParams.get('hashtag') || undefined;

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const [radius] = useState(initialRadius);

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

  const $nearbyUsers = useQuery({
    queryKey: ['nearbyUsers', userLocation, radius, shade, hashtag],
    queryFn: () =>
      getUsersByLocation({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        radius: radius / 1000,
        area: shade,
        hashtag: hashtag,
      }),
    enabled: locationLoaded,
  });

  const onUnmount = useCallback(() => {
    if (circle) {
      circle.setMap(null);
      circle.setRadius(radius);
    }
    setMap(null);
  }, [circle, radius]);

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

  const handleMapDragEnd = useCallback(() => {
    const newCenter = map?.getCenter();
    if (newCenter) {
      setUserLocation({ lat: newCenter.lat(), lng: newCenter.lng() });
      $nearbyUsers.refetch();
    }
  }, [$nearbyUsers, map]);

  if (!isLoaded || !locationLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Stack height="100vh" overflow="hidden">
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
          <FilterDrawer />
        </Toolbar>
      </AppBar>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={userLocation}
        zoom={17}
        onLoad={onLoad}
        onDragEnd={handleMapDragEnd}
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
        {$nearbyUsers.data?.users.map((user) => <UserMarker key={user._id} user={user} />)}
      </GoogleMap>
    </Stack>
  );
};

const UserMarker: React.FC<{ user: MapUser }> = ({ user }) => {
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
