import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import TagItem from 'src/components/tag';
import { useEffect, useState } from 'react';
import { useFetchItemsContext } from 'src/providers/hashtag-shade';
import { Hashtag } from '~/api/hashtag';
import { ControlledTextField } from '~/components/form/controlled/controlled-text-field';
import { Control } from 'react-hook-form';

type Props = {
  onSelect?: (hashtag: Hashtag | null) => void;
  defaultSelected?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

const HashtagSelect = ({ onSelect, defaultSelected, control }: Props) => {
  const [selectedHashtag, setSelectedHashtag] = useState<Hashtag | null>(null);

  const { hashtags, hashtagsLoading, hashtagsError } = useFetchItemsContext();
  useEffect(() => {
    if (defaultSelected && hashtags?.data) {
      const initialHashtag = hashtags.data.find((hashtag) => hashtag.hashtag === defaultSelected);
      if (initialHashtag) setSelectedHashtag(initialHashtag);
    }
  }, [defaultSelected, hashtags?.data]);

  const handleSelectHashtag = (hashtag: Hashtag) => {
    if (selectedHashtag?.hashtag === hashtag.hashtag) {
      setSelectedHashtag(null);
      if (onSelect) {
        onSelect(null);
      }
    } else {
      setSelectedHashtag(hashtag);
      if (onSelect) {
        onSelect(hashtag);
      }
    }
  };

  if (hashtagsLoading) return <Skeleton width={'100%'} height={60} />;
  if (hashtagsError) return <Typography>Failed to load shades</Typography>;

  return (
    <Accordion>
      <AccordionSummary
        sx={{
          '&.Mui-focusVisible': {
            backgroundColor: 'inherit',
          },
          '&:focus': {
            outline: 'none',
          },
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Stack alignItems="center" justifyContent="space-between" width="100%" direction="row">
          <Stack>
            <Typography fontSize={10} color="secondary">
              optional
            </Typography>
            <Typography>Hashtag</Typography>
          </Stack>

          <Stack
            width={200}
            border="1px solid #D1D1D175"
            borderRadius={3}
            boxShadow="0px 1px 5px -1px #00000014"
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            p={0.5}
          >
            <ControlledTextField
              placeholder="Select hashtag"
              InputProps={{
                sx: {
                  padding: 0,
                  margin: 0,
                  '& .MuiInputBase-input': {
                    padding: 0,
                    fontSize: 14,
                  },
                  '& fieldset': {
                    padding: 0,
                    border: 'none',
                  },
                },
              }}
              name="hashtag"
              control={control}
            />
            {selectedHashtag && (
              <IconButton
                onClick={() => {
                  setSelectedHashtag(null);
                  if (onSelect) {
                    onSelect(null);
                  }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack width="100%" gap={0.5} direction="row" flexWrap="wrap">
          {hashtags?.data!.map((hashtag) => (
            <TagItem onClick={() => handleSelectHashtag(hashtag)} key={hashtag._id} tag={hashtag.hashtag} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default HashtagSelect;
