import { Avatar, Button, Stack, Typography } from "@mui/material";
import itu from "src/assets/images/itu2.png";

import { useNavigate } from "react-router-dom";
import Loader from "src/components/loader";
import { useAuthContext } from "src/providers/auth";
import { paths } from "src/app/routes";
const Onboarding = () => {
  const navigate = useNavigate();
  const { userData } = useAuthContext();

  if (userData.isFetching)
    return (
      <Stack
        height={"100vh"}
        overflow={"hidden"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Loader />
      </Stack>
    );
  return (
    <Stack
      height={"100vh"}
      overflow={"hidden"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
    >
      <Stack></Stack>
      <Stack alignItems={"center"} textAlign={"center"}>
        <Avatar sx={{ width: 150, height: 150 }} src={itu} />
        <Typography fontSize="large" fontWeight={600}>
          Welcome to ITU Platform
        </Typography>
        <Typography fontSize="small">
          Encouraging small acts of kindness that colectivelly create a
          big,positive impact on individuals and communities
        </Typography>
      </Stack>
      <Button
        onClick={() => navigate(paths.introduceYourself)}
        fullWidth
        size="large"
        variant="contained"
      >
        Get Started
      </Button>
    </Stack>
  );
};

export default Onboarding;
