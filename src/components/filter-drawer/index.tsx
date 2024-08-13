import { Button, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";

const FilterDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen);
  };
  return (
    <Stack>
      <Button onClick={toggleDrawer(true)}>Open Bottom Drawer</Button>
      <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer(false)}>
        <Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography fontSize={"large"} fontWeight={600}>
              Filter
            </Typography>
            <Button color="secondary">Clear all</Button>
          </Stack>
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default FilterDrawer;
