import { Typography, Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";
import NavigationItem from "src/components/navigation-item";

const GroupSettings = () => {
  const navigate = useNavigate();
  return (
    <Stack margin={2} alignItems={"center"}>
      <Typography variant="h6" gutterBottom>
        Group Settings
      </Typography>
      <NavigationItem onClick={() => navigate("followings")} name="Following" />
      <NavigationItem
        name="Invitation"
        onClick={() => navigate("invitations")}
      />
    </Stack>
  );
};

export default GroupSettings;
