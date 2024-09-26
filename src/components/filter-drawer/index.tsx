import { Box, Button, Divider, Drawer, Slider, Stack, Typography } from '@mui/material';
import { useState, useCallback } from 'react';
import { useFetchItemsContext } from 'src/providers/hashtag-shade';
import ShadeComponent from '../shade-component';
import CustomAccordion from './accordion';
import { ControlledTextField } from '../form/controlled/controlled-text-field';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { Shade } from '~/api/shades/shades.schema';
import TagItem from '../tag';
import CustomSearch from './autocomplete';
import { useFilterUsersContext } from '~/providers/filter-provider';

import { paths } from '~/app/routes';
import { IconFilter } from '~/assets/icons';
import { useBoolean } from '~/lib/hooks';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';

type Props = {
  buttonColor?: string;
  refetchMap?: () => void;
};

const FilterDrawer = ({ buttonColor = 'primary.main', refetchMap }: Props) => {
  const navigate = useNavigate();

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);

  const isOpen = useBoolean();

  const isKeyboardOpen = useDetectKeyboardOpen();

  const { control, watch, setValue, selectedShade, setSelectedShade, clear, setRefetchListing } =
    useFilterUsersContext();

  const [hashtag, location, distance] = watch(['hashtag', 'location', 'distance']);

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      isOpen.setValue(newOpen);
    },
    [isOpen],
  );

  const handleSelectShade = useCallback(
    (shade: Shade) => {
      setSelectedShade((prev) => {
        const newShade = prev?.en === shade.en ? null : shade;
        setValue('shadeId', newShade?.id || ''); // Update the 'area' field in the form
        return newShade;
      });
      setExpandedAccordion(false);
    },
    [setSelectedShade, setValue, setExpandedAccordion],
  );

  const handleAccordionChange = useCallback(
    (panel: string) => () => {
      setExpandedAccordion((prev) => (prev === panel ? false : panel));
    },
    [],
  );

  const { shades, shadesLoading } = useFetchItemsContext();

  const handleShowInListing = () => {
    setRefetchListing(true);
    isOpen.setFalse();
    navigate({
      pathname: paths.listing,
      search: createSearchParams({
        tab: 'users',
      }).toString(),
    });
  };

  const handleShowInMap = () => {
    isOpen.setFalse();
    navigate(paths.map);
    refetchMap!();
  };

  const handleRadiusChange = (_event: Event, newValue: number | number[]) => {
    setValue('distance', (newValue as number) * 1000);
  };

  return (
    <Stack sx={{ position: 'absolute', right: 0 }}>
      <Box
        onClick={toggleDrawer(true)}
        sx={{
          width: 40,
          height: 40,
          borderRadius: 3,
          bgcolor: buttonColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          cursor: 'pointer',
          transition: '.3s',
          ':hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        <IconFilter sx={{ color: 'white', fontSize: 17 }} />
      </Box>

      <Drawer anchor="bottom" open={isOpen.isTrue} onClose={toggleDrawer(false)}>
        <Stack
          spacing={0.5}
          sx={{
            px: 1,
            pb: isKeyboardOpen ? 18 : 0,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize="large" fontWeight={600}>
              Filter
            </Typography>
            <Button color="secondary" onClick={clear}>
              Clear all
            </Button>
          </Stack>
          <CustomAccordion
            title="Area"
            expanded={expandedAccordion === 'area'}
            onChange={handleAccordionChange('area')}
          >
            <Stack gap={0.5} direction="row" flexWrap="wrap">
              {shadesLoading
                ? 'Loading...'
                : shades?.data.map((shade) => (
                    <ShadeComponent
                      key={shade.id}
                      selectable
                      selected={selectedShade?.en === shade.en}
                      onSelect={() => handleSelectShade(shade)}
                      color={shade.color}
                      name={shade.en}
                    />
                  ))}
            </Stack>
          </CustomAccordion>
          {selectedShade && <ShadeComponent color={selectedShade.color} name={selectedShade.en} />}
          <Divider />

          <CustomAccordion
            title="Hashtags"
            expanded={expandedAccordion === 'hashtags'}
            onChange={handleAccordionChange('hashtags')}
          >
            <ControlledTextField
              control={control}
              name="hashtag"
              placeholder="Enter the hashtag"
              InputProps={{
                sx: {
                  backgroundColor: 'rgba(240, 240, 240, 1)',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
              fullWidth
            />
          </CustomAccordion>
          {hashtag.length > 0 && <TagItem tag={hashtag} clickable onClick={() => setValue('hashtag', '')} />}
          <Divider />
          <CustomAccordion
            title="Location"
            expanded={expandedAccordion === 'location'}
            onChange={handleAccordionChange('location')}
          >
            <CustomSearch onSelect={() => setExpandedAccordion(false)} />
          </CustomAccordion>
          {location.length > 0 && <Typography>{location}</Typography>}
          <Divider />
          <CustomAccordion
            title="Distance"
            expanded={expandedAccordion === 'distance'}
            onChange={handleAccordionChange('distance')}
          >
            <Box mx={1}>
              <Slider
                value={distance! / 1000}
                onChange={handleRadiusChange}
                min={1}
                max={25}
                step={1}
                valueLabelDisplay="auto"
                aria-labelledby="radius-slider-title"
              />
            </Box>
          </CustomAccordion>
          {distance && <Typography>{distance! / 1000}</Typography>}
          <Divider />
          <Stack gap={1} direction="row">
            <Button
              sx={{
                paddingX: 2,
                paddingY: 1.5,
              }}
              fullWidth
              color="primary"
              variant="contained"
              onClick={handleShowInListing}
            >
              Show in listing
            </Button>
            <Button
              sx={{
                paddingX: 2,
                paddingY: 1.5,
              }}
              size="medium"
              fullWidth
              color="info"
              variant="contained"
              onClick={handleShowInMap}
            >
              Show on the map
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default FilterDrawer;
