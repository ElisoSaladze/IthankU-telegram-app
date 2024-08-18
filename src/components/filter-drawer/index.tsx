import {
  Button,
  Drawer,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useFetchItemsContext } from "src/providers/hashtag-shade";
import ShadeComponent from "../shade-component";
import { Shade } from "src/api/shade";
import CustomAccordion from "./accordion";

type Props = {
  radius: number;
  onRadiusChange: (event: Event, newValue: number | number[]) => void;
};

const FilterDrawer = ({ radius, onRadiusChange }: Props) => {
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false
  );

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

  return (
    <Stack>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          backgroundColor: "info.main",
          color: "white",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "info.main",
          },
        }}
        size="small"
      >
        <FilterAltOutlinedIcon />
      </IconButton>
      <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer(false)}>
        <Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography fontSize={"large"} fontWeight={600}>
              Filter
            </Typography>
            <Button color="secondary">Clear all</Button>
          </Stack>
          <CustomAccordion
            title="Area"
            expanded={expandedAccordion === "area"}
            onChange={handleAccordionChange("area")}
          >
            <Stack gap={0.5} direction={"row"} flexWrap={"wrap"}>
              {shadesLoading
                ? "loading"
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
          <CustomAccordion
            title="Hashtags"
            expanded={expandedAccordion === "hashtags"}
            onChange={handleAccordionChange("hashtags")}
          >
            <Typography></Typography>
          </CustomAccordion>
          <CustomAccordion
            title="Location"
            expanded={expandedAccordion === "location"}
            onChange={handleAccordionChange("location")}
          >
            <Typography></Typography>
          </CustomAccordion>
          <CustomAccordion
            title="Distance"
            expanded={expandedAccordion === "distance"}
            onChange={handleAccordionChange("distance")}
          >
            <Slider
              value={radius / 1000}
              onChange={onRadiusChange}
              min={1}
              max={25}
              step={1}
              valueLabelDisplay="auto"
              aria-labelledby="radius-slider-title"
            />
          </CustomAccordion>
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default FilterDrawer;
