import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "src/api/group";
import GroupItem from "src/components/group-item";
import { Group } from "src/api/group/types";
import settingsIcon from "src/assets/icons/settings.svg";
const GroupsPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => getGroups(),
  });
  const navigate = useNavigate();
  return (
    <Stack marginX={2}>
      <Stack
        marginTop={2}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        <Button
          onClick={handleClick}
          size="medium"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Create
        </Button>
        <Menu
          sx={{
            marginTop: 1,
          }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigate("/create-post")}>
            Create Post
          </MenuItem>
          <Divider
            sx={{
              backgroundColor: theme.palette.primary.main,
              "&.MuiDivider-root": {
                margin: "0 !important",
              },
            }}
          />
          <MenuItem onClick={() => navigate("/create-group/details")}>
            Create Group
          </MenuItem>
        </Menu>
        <IconButton>
          <img src={settingsIcon} />
        </IconButton>
      </Stack>
      {isLoading ? (
        <Stack marginY={1} gap={1}>
          {[...Array(5)].map((_, index) => (
            <Skeleton
              sx={{ borderRadius: 5 }}
              key={index}
              variant="rectangular"
              height={80}
            />
          ))}
        </Stack>
      ) : (
        <Stack marginY={1} gap={1}>
          {data?.data.map((group: Group, i: number) => (
            <GroupItem key={i} group={group} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default GroupsPage;
