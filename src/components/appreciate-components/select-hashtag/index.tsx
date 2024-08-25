/* eslint-disable @typescript-eslint/no-unused-expressions */
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import TagItem from 'src/components/tag';
import { useEffect, useState } from 'react';
import { useFetchItemsContext } from 'src/providers/hashtag-shade';
import { Hashtag } from '~/api/hashtag';

type Props = {
  onSelect?: (hashtag: Hashtag | null) => void;
  defaultSelected?: string;
};

const HashtagSelect = ({ onSelect, defaultSelected }: Props) => {
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
      onSelect && onSelect(null);
    } else {
      setSelectedHashtag(hashtag);
      onSelect && onSelect(hashtag);
    }
  };

  if (hashtagsLoading) return <Skeleton width={'100%'} height={60} />;
  if (hashtagsError) return <Typography>Failed to load shades</Typography>;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack alignItems={'center'} justifyContent={'space-between'} width={'100%'} direction={'row'}>
          <Stack>
            <Typography fontSize={10} color={'secondary'}>
              optional
            </Typography>
            <Typography>Hashtag</Typography>
          </Stack>

          <Stack
            minWidth={200}
            border={'1px solid #D1D1D175'}
            borderRadius={3}
            bgcolor={selectedHashtag ? 'white' : '#EEEEEE8A'}
            boxShadow={'0px 1px 5px -1px #00000014'}
            alignItems={'center'}
            direction={'row'}
            p={0.5}
            justifyContent={'space-between'}
          >
            {selectedHashtag ? (
              <>
                <Typography>{selectedHashtag.hashtag}</Typography>
                <IconButton
                  onClick={() => {
                    setSelectedHashtag(null);
                    // setValue('')
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <Typography fontSize={14}>Select hashtag</Typography>
            )}
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack width={'100%'} gap={0.5} direction={'row'} flexWrap={'wrap'}>
          {hashtags?.data!.map((hashtag) => (
            <TagItem onClick={() => handleSelectHashtag(hashtag)} key={hashtag._id} tag={hashtag.hashtag} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default HashtagSelect;
