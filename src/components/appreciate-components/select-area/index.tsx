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
import { getShades, Shade } from "src/api/shade";
import ShadeComponent from "src/components/shade-component";
import { useEffect, useState } from "react";
type Props = {
  onSelect?: (shade: Shade | null) => void;
  defaultSelected?: string;
};
const AreaSelect = ({ onSelect, defaultSelected }: Props) => {
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);

  const {
    data: shades,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["shades"],
    queryFn: async () => getShades(),
  });

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
      const initialShade = shades.data.find(
        (shade) => shade.en === defaultSelected
      );
      if (initialShade) setSelectedShade(initialShade);
    }
  }, [defaultSelected, shades?.data]);

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
            bgcolor={selectedShade ? "white" : "#EEEEEE8A"}
            boxShadow={"0px 1px 5px -1px #00000014"}
            alignItems={"center"}
            direction={"row"}
            p={0.5}
            justifyContent={"space-between"}
          >
            {selectedShade ? (
              <>
                <ShadeComponent
                  name={selectedShade.en}
                  color={selectedShade.color}
                />
                <IconButton
                  onClick={() => {
                    setSelectedShade(null);
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
          {shades.data!.map((shade) => (
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
      </AccordionDetails>
    </Accordion>
  );
};

export default AreaSelect;
