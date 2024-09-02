import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import MapSvg from 'src/assets/icons/map.svg';
import { AppBar, Box, Chip, Stack, Toolbar, Typography } from '@mui/material';
import FilterDrawer from 'src/components/filter-drawer';
import { getUsersByLocation, MapUser } from '~/api/users';
import { useQuery } from '@tanstack/react-query';
import { useFilterUsersContext } from '~/providers/filter-provider';
import { qk } from '~/api/query-keys';
import Loader from '~/components/loader';
import CircleIcon from '@mui/icons-material/Circle';

const MapPage = () => {
  const { watch, setValue, selectedShade } = useFilterUsersContext();

  const initialRadius = watch('distance') || 1000;
  const shade = watch('area') || undefined;
  const hashtag = watch('hashtag') || undefined;
  const location = watch('userLocation');

  const [map, setMap] = useState<google.maps.Map | null>(null);
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
        center: location,
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
    [location, radius],
  );

  const $nearbyUsers = useQuery({
    queryKey: qk.map.list.toKeyWithArgs({
      shade: shade,
      radius: initialRadius.toString(),
      hashtag: hashtag,
      userLocation: location,
    }),
    queryFn: () =>
      getUsersByLocation({
        latitude: location.lat,
        longitude: location.lng,
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

  const handleMapDragEnd = useCallback(() => {
    const newCenter = map?.getCenter();
    if (newCenter) {
      setValue('userLocation', { lat: newCenter.lat(), lng: newCenter.lng() });

      $nearbyUsers.refetch();
    }
  }, [$nearbyUsers, map, setValue]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setValue('userLocation', userLocation);

          if (map) {
            const service = new google.maps.places.PlacesService(map);
            const request = {
              location: new google.maps.LatLng(userLocation.lat, userLocation.lng),
              radius: 1,
            };

            service.nearbySearch(request, (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results![0]) {
                const place = results![0];
                setValue('location', place.vicinity! || place.name!);
              } else {
                console.error('No nearby place found or error occurred.');
              }
            });
          }

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
  }, [map, setValue]);

  if (!locationLoaded) {
    return <Loader />;
  }

  return (
    <Stack height="100vh" overflow="hidden">
      <AppBar sx={{ pr: 2, position: 'relative' }}>
        <Toolbar>
          <Box>
            <Typography color={'black'} fontWeight={500} variant="h6" component="div" fontSize={20}>
              People nearby
            </Typography>
          </Box>
          <FilterDrawer buttonColor="info.main" />
        </Toolbar>
      </AppBar>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={location}
        zoom={14}
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

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            position: 'absolute',
            left: '50%',
            top: '80%',
            transform: 'translate(-50%, 0)',
          }}
        >
          {selectedShade && (
            <Chip
              sx={{
                backgroundColor: 'white',
                '& .MuiChip-label': {
                  px: 0.5,
                },
              }}
              label={
                <Box display="flex">
                  <CircleIcon sx={{ color: selectedShade.color }} />
                  <Typography>{selectedShade.en}</Typography>
                </Box>
              }
            />
          )}
          {hashtag && <Chip sx={{ backgroundColor: selectedShade?.color }} label={hashtag} />}
        </Box>

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
