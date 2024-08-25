import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { paths } from 'src/app/routes';

const PendingTransactionsPage = () => {
  const location = useLocation();
  const [list, setList] = useState('incoming');
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
    <Stack px={3} justifyContent="center">
      <Typography mb={2} textAlign="center">
        Pending Transactions
      </Typography>
      <Stack>
        <ToggleButtonGroup color="primary" fullWidth value={list} exclusive onChange={handleListChange}>
          <ToggleButton value="incoming">Incoming</ToggleButton>
          <ToggleButton value="outgoing">Outgoing</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack></Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <Button onClick={() => navigate(paths.incomingTransactions)} sx={{ padding: 0 }}>
          <Typography sx={{ textDecoration: 'underline' }} textAlign="end" fontSize="small" color="primary">
            See All Transactions
          </Typography>
          <ArrowForwardIosIcon color="primary" sx={{ height: '10px' }} />
        </Button>
      </Stack>
      <Outlet />
    </Stack>
  );
};

export default PendingTransactionsPage;
