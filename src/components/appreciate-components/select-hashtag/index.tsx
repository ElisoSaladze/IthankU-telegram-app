/* eslint-disable @typescript-eslint/no-unused-expressions */
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getHashtags, Hashtag } from "src/api/hashtag/api";
import TagItem from "src/components/tag";
import { useState } from "react";
type Props = {
  onSelect?: (shade: Hashtag | null) => void;
};
const HashtagSelect = ({ onSelect }: Props) => {
  const [selectedHashtag, setSelectedHashtag] = useState<Hashtag | null>(null);

  const {
    data: hashtags,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["hashtags"],
    queryFn: getHashtags,
  });

  const handleSelectHashtag = (hashtag: Hashtag) => {
    if (selectedHashtag?.hashtag === hashtag.hashtag) {
      setSelectedHashtag(null);
      onSelect && onSelect(null);
    } else {
      setSelectedHashtag(hashtag);
      onSelect && onSelect(hashtag);
    }
  };

  if (isLoading || isFetching) return <Skeleton width={"100%"} height={60} />;
  if (isError) return <Typography>Failed to load shades</Typography>;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
          direction={"row"}
        >
          <Stack>
            <Typography fontSize={10} color={"secondary"}>
              optional
            </Typography>
            <Typography>Area</Typography>
          </Stack>

          <Stack
            minWidth={200}
            border={"1px solid #D1D1D175"}
            borderRadius={3}
            bgcolor={selectedHashtag ? "white" : "#EEEEEE8A"}
            boxShadow={"0px 1px 5px -1px #00000014"}
            alignItems={"center"}
            direction={"row"}
            p={0.5}
            justifyContent={"space-between"}
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
              <Typography fontSize={14}>Select shade</Typography>
            )}
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack width={"100%"} gap={0.5} direction={"row"} flexWrap={"wrap"}>
          {hashtags.data!.map((hashtag) => (
            <TagItem
              onClick={() => handleSelectHashtag(hashtag)}
              key={hashtag._id}
              tag={hashtag.hashtag}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default HashtagSelect;
