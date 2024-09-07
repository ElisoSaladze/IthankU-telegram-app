import { Box, Button, Stack, Typography } from '@mui/material';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AppHeader } from '~/components/header';
import { Tab, Tabs } from '../../components/tabs';
import { TransactionsList } from './components';
import { IconArrow } from '~/assets/icons';
import { paths } from '~/app/routes';

type TabTypes = 'incoming' | 'outgoing';

const tabs: Array<Tab<TabTypes>> = [
  {
    label: 'Incoming',
    value: 'incoming',
    tabComponent: <TransactionsList type="INCOMING" />,
  },
  {
    label: 'Outgoing',
    value: 'outgoing',
    tabComponent: <TransactionsList type="OUTGOING" />,
  },
];

export const TransactionsPage = () => {
  const navigate = useNavigate();

  const [searchparams] = useSearchParams();
  const activeTab = searchparams.get('tab');

  return (
    <Box position="relative">
      <AppHeader
        headerSx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      />
      <Stack px={3} justifyContent="center" spacing={2}>
        <Typography textAlign="center" fontSize={24}>
          Transactions
        </Typography>

        <Tabs<TabTypes>
          defaultTab="incoming"
          tabs={tabs}
          separateComponent={
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <Button
                onClick={() => {
                  navigate({
                    pathname: paths.pendingTransactions,
                    search: createSearchParams({
                      tab: activeTab ?? 'incoming',
                    }).toString(),
                  });
                }}
                sx={{ padding: 0 }}
              >
                <Typography sx={{ textDecoration: 'underline' }} textAlign="end" fontSize="small" color="primary">
                  See Pending Transactions
                </Typography>
                <IconArrow direction="right" sx={{ fontSize: 9 }} />
              </Button>
            </Stack>
          }
        />
      </Stack>
    </Box>
  );
};
