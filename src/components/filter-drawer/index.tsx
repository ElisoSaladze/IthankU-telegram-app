import { Button, Drawer, IconButton, InputAdornment, Slider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useFetchItemsContext } from 'src/providers/hashtag-shade';
import ShadeComponent from '../shade-component';
import CustomAccordion from './accordion';
import { ControlledTextField } from '../form/controlled/controlled-text-field';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { NearMe } from '@mui/icons-material';
import { Shade } from '~/api/shades/shades.schema';

const FilterDrawer = () => {
  const navigate = useNavigate();
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
  const { control, getValues, watch, setValue } = useForm({
    defaultValues: {
      area: '',
      hashtag: '',
      location: '',
      distance: 1,
    },
  });

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen);
  };

  const handleSelectShade = (shade: Shade) => {
    if (selectedShade?.en === shade.en) {
      setSelectedShade(null);
    } else {
      setSelectedShade(shade);
    }
  };

  const handleAccordionChange = (panel: string) => () => {
    setExpandedAccordion(expandedAccordion === panel ? false : panel);
  };

  const { shades, shadesLoading } = useFetchItemsContext();

  const generateQueryString = (radius: number, area: string, hashtag: string, selectedShade: Shade | null) => {
    const radiusKm = radius / 1000;
    const queryParams = new URLSearchParams();

    if (radiusKm > 0) {
      queryParams.append('radius', radiusKm.toString());
    }
    if (selectedShade?.en || area) {
      queryParams.append('shade', selectedShade?.en ?? area);
    }
    if (hashtag) {
      queryParams.append('hashtag', hashtag);
    }

    return queryParams.toString();
  };

  const handleShowInListing = () => {
    const { area, hashtag, distance } = getValues();
    const queryString = generateQueryString(distance, area, hashtag, selectedShade);
    setIsOpen(false);
    navigate(`/more/listing/users-list${queryString ? `?${queryString}` : ''}`);
  };

  const handleShowInMap = () => {
    const { area, hashtag, distance } = getValues();
    const queryString = generateQueryString(distance, area, hashtag, selectedShade);
    setIsOpen(false);
    navigate(`/map${queryString ? `?${queryString}` : ''}`);
  };

  const handleRadiusChange = (_event: Event, newValue: number | number[]) => {
    const radiusInKm = newValue as number;
    const radiusInMeters = radiusInKm * 1000;
    setValue('distance', radiusInMeters);
  };

  return (
    <Stack>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          backgroundColor: 'info.main',
          color: 'white',
          borderRadius: '12px',
          '&:hover': {
            backgroundColor: 'info.main',
          },
        }}
        size="small"
      >
        <FilterAltOutlinedIcon />
      </IconButton>
      <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer(false)}>
        <Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography fontSize={'large'} fontWeight={600}>
              Filter
            </Typography>
            <Button color="secondary">Clear all</Button>
          </Stack>
          <CustomAccordion
            title="Area"
            expanded={expandedAccordion === 'area'}
            onChange={handleAccordionChange('area')}
          >
            <Stack gap={0.5} direction={'row'} flexWrap={'wrap'}>
              {shadesLoading
                ? 'loading'
                : shades?.data.map((shade) => (
                    <ShadeComponent
                      key={shade._id}
                      selectable
                      selected={selectedShade?.en === shade.en}
                      onSelect={() => handleSelectShade(shade)}
                      color={shade.color}
                      name={shade.en}
                    />
                  ))}
            </Stack>
          </CustomAccordion>
          {selectedShade && <ShadeComponent color={selectedShade?.color} name={selectedShade.en} />}
          <CustomAccordion
            title="Hashtags"
            expanded={expandedAccordion === 'hashtags'}
            onChange={handleAccordionChange('hashtags')}
          >
            <ControlledTextField
              placeholder="Enter the hashtag"
              InputProps={{
                sx: {
                  backgroundColor: 'rgba(240, 240, 240, 1)',
                  '& fieldset': {
                    border: 'none', // Remove the border
                  },
                },
              }}
              fullWidth
              control={control}
              name="hashtag"
            />
          </CustomAccordion>
          <CustomAccordion
            title="Location"
            expanded={expandedAccordion === 'location'}
            onChange={handleAccordionChange('location')}
          >
            {/* TODO: implement location autocomplete */}
            <ControlledTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NearMe />
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
          </CustomAccordion>
          <CustomAccordion
            title="Distance"
            expanded={expandedAccordion === 'distance'}
            onChange={handleAccordionChange('distance')}
          >
            <Slider
              value={watch('distance') / 1000}
              onChange={handleRadiusChange}
              min={1}
              max={25}
              step={1}
              valueLabelDisplay="auto"
              aria-labelledby="radius-slider-title"
            />
          </CustomAccordion>
          <Stack gap={1} direction={'row'}>
            <Button size="medium" fullWidth color="primary" variant="contained" onClick={handleShowInListing}>
              Show in listing
            </Button>
            <Button size="medium" fullWidth color="info" variant="contained" onClick={handleShowInMap}>
              Show on the map
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default FilterDrawer;
