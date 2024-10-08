import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import ShadeComponent from 'src/components/shade-component';
import { useEffect, useState } from 'react';
import { useFetchItemsContext } from 'src/providers/hashtag-shade';
import { Shade } from '~/api/shades';
import { ErrorView } from '../error-view';

type Props = {
  onSelect?: (shade: Shade | null) => void;
  defaultSelected?: string | null;
};

export const AreaSelect = ({ onSelect, defaultSelected }: Props) => {
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);

  const { shades, shadesLoading, shadesError } = useFetchItemsContext();

  const handleSelectShade = (shade: Shade) => {
    if (selectedShade?.en === shade.en) {
      setSelectedShade(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSelect && onSelect(null);
    } else {
      setSelectedShade(shade);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSelect && onSelect(shade);
    }
  };

  useEffect(() => {
    if (defaultSelected && shades?.data) {
      const initialShade = shades.data.find((shade) => shade.en === defaultSelected);
      if (initialShade) setSelectedShade(initialShade);
    }
  }, [defaultSelected, shades?.data]);

  if (shadesLoading) return <Skeleton width={'100%'} height={60} />;

  if (shadesError) return <ErrorView message="Failed to load shades" />;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack alignItems={'center'} justifyContent={'space-between'} width={'100%'} direction={'row'}>
          <Stack>
            <Typography fontSize={10} color={'secondary'}>
              optional
            </Typography>
            <Typography>Area</Typography>
          </Stack>

          <Stack
            minWidth={200}
            border={'1px solid #D1D1D175'}
            borderRadius={3}
            boxShadow={'0px 1px 5px -1px #00000014'}
            alignItems={'center'}
            direction={'row'}
            p={0.5}
            justifyContent={'space-between'}
          >
            {selectedShade ? (
              <>
                <ShadeComponent name={selectedShade.en} color={selectedShade.color} />
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedShade(null);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <Typography color="#b7b7b7" fontSize={14}>
                Select shade
              </Typography>
            )}
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack width={'100%'} gap={0.5} direction={'row'} flexWrap={'wrap'}>
          {shades?.data.map((shade) => (
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
      </AccordionDetails>
    </Accordion>
  );
};
