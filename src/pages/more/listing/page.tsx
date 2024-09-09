import { Box, Stack, Typography } from '@mui/material';
import { AppHeader } from '~/components/header';
import { Tab, Tabs } from '~/components/tabs';
import { GroupsList, UsersList } from './tabs';
import FilterDrawer from '~/components/filter-drawer';
import { paths } from '~/app/routes';

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
        backPath={paths.more}
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
          <FilterDrawer />
        </Box>

        <Tabs<TabTypes> defaultTab="groups" tabs={tabs} />
      </Stack>
    </Box>
  );
};
