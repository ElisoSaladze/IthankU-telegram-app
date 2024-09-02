import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import FilterDrawer from '~/components/filter-drawer';

const Listing = () => {
  const location = useLocation();
  const [list, setList] = useState('groups-list');
  const navigate = useNavigate();

  useEffect(() => {
    const pathSegment = location.pathname.split('/')[3]!; //TODO

    setList(pathSegment);
  }, [location.pathname]);

  const handleListChange = (_event: React.MouseEvent<HTMLElement>, newList: string) => {
    if (newList !== null) {
      setList(newList);
      navigate(newList);
    }
  };

  return (
    <Stack p={3} spacing={2}>
      <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'}>
        <Box width={40}></Box>
        <Typography>Listing</Typography>
        <FilterDrawer />
      </Stack>
      <Stack spacing={1}>
        <ToggleButtonGroup color="primary" fullWidth value={list} exclusive onChange={handleListChange}>
          <ToggleButton value="groups-list">Groups</ToggleButton>
          <ToggleButton value="users-list">Users</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Outlet />
    </Stack>
  );
};

export default Listing;
