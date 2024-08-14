import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import groupsIcon from "src/assets/icons/groups.svg";
import homeIcon from "src/assets/icons/home.svg";
import mapIcon from "src/assets/icons/map.svg";
import moreIcon from "src/assets/icons/more.svg";
import notificationsIcon from "src/assets/icons/notifications.svg";
import qrCodeIcon from "src/assets/icons/qr.svg";
import groupsIconSelected from "src/assets/icons/selectedGroups.svg";
import homeIconSelected from "src/assets/icons/selectedHome.svg";
import mapIconSelected from "src/assets/icons/selectedMap.svg";
import moreIconSelected from "src/assets/icons/selectedMore.svg";
import ituIcon from "src/assets/images/itu.svg";
import nav from "src/assets/images/nav.svg";

import React, { Suspense, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loader from "src/components/loader";
import AppreciateComponent from "src/components/appreciate-components/appreciate-buttons";

const useActiveIndex = () => {
  const location = useLocation();

  const activePath = location.pathname.split("/")[1];

  const paths = ["home", "groups", "", "map", "more"];

  const activeIndex = paths.indexOf(activePath);

  return activeIndex !== -1 ? activeIndex : false;
};
const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  "& .Mui-selected": {
    color: theme.palette.primary.main,
  },
  "& .MuiBottomNavigationAction-root": {
    color: theme.palette.secondary.dark,
  },
}));

const HomePage = () => {
  const [showAppreciate, setShowAppreciate] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const activeIndex = useActiveIndex();
  const theme = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPageName = () => {
    switch (activeIndex) {
      case 0:
        return "Home";
      case 1:
        return "Groups";
      case 3:
        return "Map";
      case 4:
        return "";
      default:
        return "Home";
    }
  };

  return (
    <Box height={"100vh"} overflow={"auto"} position={"relative"}>
      <AppBar
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <img src={ituIcon} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              fontWeight={500}
              variant="h6"
              component="div"
              sx={{ textAlign: "center", color: "black", fontSize: 20 }}
            >
              {getPageName()}
            </Typography>
          </Box>

          <IconButton
            sx={{
              visibility:
                activeIndex == 4 || activeIndex == 1 ? "hidden" : "visible",
            }}
            onClick={handleClick}
          >
            <AddCircleOutlineIcon fontSize="large" color="primary" />
          </IconButton>

          <Menu
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
            <img src={notificationsIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box height={"100%"}>
        <Box height={"100%"} paddingY={8}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Box>
        <AppreciateComponent
          show={showAppreciate}
          setShow={setShowAppreciate}
        />
      </Box>
      <Paper
        sx={{
          backgroundImage: showAppreciate ? `url(${nav})` : "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          paddingY: 0.8,
          backgroundColor: showAppreciate ? "transparent" : "white",
          boxShadow: showAppreciate
            ? "none"
            : "0px 1px 10.4px -2px rgba(0, 0, 0, 0.25)",
        }}
        elevation={3}
      >
        <StyledBottomNavigation
          value={activeIndex}
          sx={{
            boxShadow: "none",
            backgroundColor: "transparent",
          }}
          showLabels
        >
          <BottomNavigationAction
            onClick={() => navigate("home")}
            icon={
              activeIndex === 0 ? (
                <img src={homeIconSelected} />
              ) : (
                <img src={homeIcon} />
              )
            }
            label="Home"
          />
          <BottomNavigationAction
            onClick={() => navigate("groups")}
            icon={
              activeIndex === 1 ? (
                <img src={groupsIconSelected} />
              ) : (
                <img src={groupsIcon} />
              )
            }
            label="Groups"
          />
          <IconButton
            onClick={() => setShowAppreciate(true)}
            sx={{
              visibility: showAppreciate ? "hidden" : "visible",
            }}
          >
            <img src={qrCodeIcon} />
          </IconButton>
          <BottomNavigationAction
            onClick={() => navigate("map")}
            icon={
              activeIndex === 3 ? (
                <img src={mapIconSelected} />
              ) : (
                <img src={mapIcon} />
              )
            }
            label="Map"
          />
          <BottomNavigationAction
            onClick={() => navigate("more")}
            icon={
              activeIndex === 4 ? (
                <img src={moreIconSelected} />
              ) : (
                <img src={moreIcon} />
              )
            }
            label="More"
          />
        </StyledBottomNavigation>
      </Paper>
    </Box>
  );
};

export default HomePage;
