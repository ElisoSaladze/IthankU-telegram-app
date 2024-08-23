import { Typography, Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { paths } from "src/app/routes";
import NavigationItem from "src/components/navigation-item";

const GroupSettings = () => {
  const navigate = useNavigate();
  return (
    <Stack mx={3} alignItems="center">
      <Typography variant="h6" gutterBottom>
        Group Settings
      </Typography>
      <NavigationItem
        onClick={() => navigate(paths.groupSettingsFollowings)}
        name="Following"
      />
      <NavigationItem
        name="Invitation"
        onClick={() => navigate(paths.groupSettingsInvitations)}
      />
    </Stack>
  );
};

export default GroupSettings;
