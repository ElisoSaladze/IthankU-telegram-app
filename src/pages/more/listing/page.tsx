import { Box, Stack, Typography } from '@mui/material';
import { AppHeader } from '~/components/header';
import { IconFilter } from '~/assets/icons';
import { GroupsList, UsersList } from './tabs';
import { Tab, Tabs } from '~/components/tabs';

type TabTypes = 'groups' | 'users';

const tabs: Array<Tab<TabTypes>> = [
  {
    label: 'Groups',
    value: 'groups',
    tabComponent: <GroupsList />,
  },
  {
    label: 'Users',
    value: 'users',
    tabComponent: <UsersList />,
  },
];

export const ListingPage = () => {
  return (
    <Box position="relative">
      <AppHeader
        headerSx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      />

      <Stack p={3} pt={1} spacing={2}>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Typography fontSize={24}>Listing</Typography>

          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 3,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: 0,
              cursor: 'pointer',
              transition: '.3s',
              ':hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <IconFilter sx={{ color: 'white', fontSize: 17 }} />
          </Box>
        </Box>

        <Tabs<TabTypes> defaultTab="groups" tabs={tabs} />
      </Stack>
    </Box>
  );
};
