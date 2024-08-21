import {
  Avatar,
  Divider,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import accounts from "src/assets/icons/accounts.svg";
import language from "src/assets/icons/language.svg";
import listing from "src/assets/icons/listing.svg";
import mapIcon from "src/assets/icons/map.svg";
import privateIcon from "src/assets/icons/private.svg";
import transactions from "src/assets/icons/transactions.svg";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ControlledSwitch } from "src/components/form/controlled/controlled-switch";
import NavigationItem from "src/components/navigation-item";
import { useGetUserDetailsContext } from "src/providers/user-data";
import Loader from "src/components/loader";
import { useMutation } from "@tanstack/react-query";
import {
  updateAccountVisibility,
  updateLocationVisibility,
} from "src/api/auth/api";
import { useAuthContext } from "src/providers/auth";

const MorePage = () => {
  const { userData } = useAuthContext();
  const { user, isLoading, isFetching } = useGetUserDetailsContext();
  const navigate = useNavigate();
  const { control, watch } = useForm({
    defaultValues: {
      private: user?.user.isPrivate,
      showOnMap: user?.user.isLocationPublic,
    },
  });

  const { mutate: updateVisibility } = useMutation({
    mutationFn: (isPrivate: boolean) => updateAccountVisibility(isPrivate),
  });

  const { mutate: updateLocation } = useMutation({
    mutationFn: (isPrivate: boolean) => updateLocationVisibility(isPrivate),
  });

  if (isLoading && isFetching) return <Loader />;

  return (
    <Stack mx={3} gap={1.5}>
      <ListItemButton onClick={() => navigate(`${userData.data!.user._id}`)}>
        <Stack
          width={1}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          gap={1}
        >
          <Stack gap={1.5} direction="row" alignItems="center">
            <Avatar src={user?.user.picture} sx={{ width: 65, height: 65 }} />
            <Stack>
              <Typography fontSize={20}>{user?.user.name}</Typography>
              <Typography fontSize={14} color="secondary.dark">
                {user?.user.email}
              </Typography>
            </Stack>
          </Stack>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <Typography color="white">{user?.user.generalRating}</Typography>
          </Avatar>
        </Stack>
      </ListItemButton>
      <Stack>
        <NavigationItem
          onClick={() => navigate("accounts")}
          icon={accounts}
          name="Accounts"
        />
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Stack p={0.5} alignItems="center" spacing={1} direction="row">
            <img width={21} src={privateIcon} />
            <Stack>
              <Typography>Private account</Typography>
              <Typography fontSize="small" color="secondary.dark">
                your account is now visible in listing
              </Typography>
            </Stack>
          </Stack>

          <ControlledSwitch
            onChange={() => updateVisibility(watch("private")!)}
            name="private"
            control={control}
          />
        </Stack>

        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Stack p={0.5} alignItems="center" spacing={1} direction="row">
            <img width={21} src={mapIcon} />
            <Stack>
              <Typography>Show my location on map</Typography>
              <Typography fontSize="small" color="secondary.dark">
                Your account is now visible on map
              </Typography>
            </Stack>
          </Stack>
          <ControlledSwitch
            onChange={() => updateLocation(watch("showOnMap")!)}
            name="showOnMap"
            control={control}
          />
        </Stack>
        <Divider />
        <NavigationItem
          onClick={() => navigate("listing/groups-list")}
          icon={listing}
          name="Listing"
        />
        <NavigationItem
          onClick={() => navigate("transactions/incoming")}
          icon={transactions}
          name="Transactions"
        />
        <NavigationItem
          onClick={() => navigate("language")}
          icon={language}
          name="Language"
        />
      </Stack>
    </Stack>
  );
};

export default MorePage;
