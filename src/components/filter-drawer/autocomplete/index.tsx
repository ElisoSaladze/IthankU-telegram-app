import { useState, useEffect } from 'react';
import { InputAdornment, Stack, Typography, CircularProgress, Box, ListItemButton } from '@mui/material';
import { NearMe } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { ControlledTextField } from '~/components/form/controlled/controlled-text-field';
import { useFilterUsersContext } from '~/providers/filter-provider';

type Props = {
  onSelect: (place: string) => void;
};

const CustomSearch = ({ onSelect }: Props) => {
  const { control, watch, setValue } = useFilterUsersContext();
  const [places, setPlaces] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputValue = watch('location');

  useEffect(() => {
    const fetchPlaces = async () => {
      if (inputValue.length >= 1) {
        setLoading(true);
        const service = new google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input: inputValue }, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setPlaces(predictions || []);
            setOpen(true);
          } else {
            setPlaces([]);
            setOpen(false);
          }
          setLoading(false);
        });
      } else {
        setPlaces([]);
        setOpen(false);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [inputValue]);

  const handleSelectPlace = (place: google.maps.places.AutocompletePrediction) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId: place.place_id }, (details, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && details) {
        setValue('location', place.description);
        setValue('userLocation', details.geometry!.location!.toJSON());
        setPlaces([]);
        setOpen(false);
        onSelect(place.description);
      }
    });
  };

  return (
    <Stack spacing={1} position="relative">
      <ControlledTextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NearMe />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CloseIcon onClick={() => setValue('location', '')} />
            </InputAdornment>
          ),
          sx: {
            backgroundColor: 'rgba(240, 240, 240, 1)',
            '& fieldset': {
              border: 'none',
            },
          },
        }}
        fullWidth
        control={control}
        name="location"
      />
      {open && (
        <Stack height={150} overflow="auto">
          {loading ? (
            <Stack alignItems="center" justifyContent="center" height="100%">
              <CircularProgress />
            </Stack>
          ) : (
            places.length > 0 && (
              <Stack>
                {places.map((place) => (
                  <ListItemButton key={place.place_id} onClick={() => handleSelectPlace(place)}>
                    <Box p={1}>
                      <Typography textAlign="start" variant="body2">
                        {place.description}
                      </Typography>
                    </Box>
                  </ListItemButton>
                ))}
              </Stack>
            )
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default CustomSearch;
