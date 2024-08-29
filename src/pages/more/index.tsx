import { Avatar, Divider, ListItemButton, Stack, Typography } from '@mui/material';
import accounts from 'src/assets/icons/accounts.svg';
import language from 'src/assets/icons/language.svg';
import listing from 'src/assets/icons/listing.svg';
import mapIcon from 'src/assets/icons/map.svg';
import privateIcon from 'src/assets/icons/private.svg';
import transactions from 'src/assets/icons/transactions.svg';

import { useForm } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router-dom';

import { ControlledSwitch } from 'src/components/form/controlled/controlled-switch';
import NavigationItem from 'src/components/navigation-item';
import Loader from 'src/components/loader';
import { useMutation } from '@tanstack/react-query';
import { updateAccountVisibility, updateLocationVisibility } from '~/api/auth';
import { useUserDetails } from '~/lib/hooks';
import { paths } from '~/app/routes';

const MorePage = () => {
  const navigate = useNavigate();

  const { user: userDetails, isLoading } = useUserDetails();

  const { control, watch } = useForm({
    defaultValues: {
      private: userDetails?.user.isPrivate,
      showOnMap: userDetails?.user.isLocationPublic,
    },
  });

  const showOnMap = watch('showOnMap');
  const isPrivate = watch('private');

  const $updateAccountVisibility = useMutation({
    mutationFn: updateAccountVisibility,
  });

  const $updateLocationVisibility = useMutation({
    mutationFn: updateLocationVisibility,
  });

  if (isLoading) return <Loader />;

  if (!userDetails) {
    return;
  }

  return (
    <Stack mx={3} gap={1.5}>
      {userDetails && (
        <ListItemButton
          onClick={() => {
            navigate(
              generatePath(paths.userDetails, {
                userId: userDetails.user._id,
              }),
            );
          }}
        >
          <Stack width={1} justifyContent="space-between" direction="row" alignItems="center" gap={1}>
            <Stack gap={1.5} direction="row" alignItems="center">
              <Avatar src={userDetails.user.picture} sx={{ width: 65, height: 65 }} />
              <Stack>
                <Typography fontSize={20}>{userDetails.user.name}</Typography>
                <Typography fontSize={14} color="secondary.dark">
                  {userDetails.user.email}
                </Typography>
              </Stack>
            </Stack>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Typography color="white">{userDetails.user.generalRating}</Typography>
            </Avatar>
          </Stack>
        </ListItemButton>
      )}
      <Stack>
        <NavigationItem onClick={() => navigate(paths.accounts)} icon={accounts} name="Accounts" />
        <Divider />
        <Stack alignItems="center" direction="row" justifyContent="space-between">
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
            onChange={() => {
              $updateAccountVisibility.mutate({
                isPrivate: isPrivate!,
              });
            }}
            name="private"
            control={control}
          />
        </Stack>

        <Stack alignItems="center" direction="row" justifyContent="space-between">
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
            onChange={() => {
              $updateLocationVisibility.mutate({
                isPrivate: showOnMap!,
              });
            }}
            name="showOnMap"
            control={control}
          />
        </Stack>
        <Divider />
        <NavigationItem onClick={() => navigate(paths.groupsList)} icon={listing} name="Listing" />
        <NavigationItem onClick={() => navigate(paths.incomingTransactions)} icon={transactions} name="Transactions" />
        <NavigationItem onClick={() => navigate(paths.language)} icon={language} name="Language" />
      </Stack>
    </Stack>
  );
};

export default MorePage;
