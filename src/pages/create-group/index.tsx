/* eslint-disable no-console */
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  useCreateGroupContext,
  CreateGroupProvider,
} from "src/providers/create-group-provider";

const CreateGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleSubmit, isFormValid } = useCreateGroupContext();
  const activePath = location.pathname.split("/")[2];

  const navigateToNextStep = () => {
    if (activePath === "details") {
      navigate("group-interests");
    } else if (activePath === "group-interests") {
      navigate("final");
    }
  };

  useEffect(() => {
    if (!isFormValid()) {
      navigate("/create-group/details");
    }
  }, [isFormValid, navigate]);

  return (
    <Stack height={"100vh"}>
      <AppBar
        sx={{
          paddingX: 2,
          position: "fixed",
          backgroundColor: "transparent",
        }}
      >
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <IconButton
            onClick={() =>
              activePath === "details" ? navigate("/home") : navigate(-1)
            }
          >
            <ArrowBackIosIcon
              fontSize={"small"}
              sx={{ color: activePath === "details" ? "white" : "black" }}
            />
          </IconButton>
          <Typography
            color={activePath === "details" ? "white" : "black"}
            textAlign={"center"}
          >
            Create Group
          </Typography>
          {activePath !== "final" ? (
            <Button onClick={handleSubmit(navigateToNextStep)}>Next</Button>
          ) : (
            <Box width={40}></Box>
          )}
        </Stack>
      </AppBar>
      <Outlet />
    </Stack>
  );
};

const CreateGroupPage = () => {
  return (
    <CreateGroupProvider>
      <CreateGroup />
    </CreateGroupProvider>
  );
};

export default CreateGroupPage;
