import { Box, Button, Stack, Typography } from '@mui/material';
import { AppHeader } from '~/components/header';
import { Tab, Tabs } from '../../components/tabs';
import { PendingTransactionsList } from './components';
import { paths } from '~/app/routes';
import { IconArrow } from '~/assets/icons';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

type TabTypes = 'incoming' | 'outgoing';

const tabs: Array<Tab<TabTypes>> = [
  {
    label: 'Incoming',
    value: 'incoming',
    tabComponent: <PendingTransactionsList type="incoming" />,
  },
  {
    label: 'Outgoing',
    value: 'outgoing',
    tabComponent: <PendingTransactionsList type="outgoing" />,
  },
];

export const PendingTransactionsPage = () => {
  //   const location = useLocation();
  //   const [list, setList] = useState('incoming');
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const pathSegment = location.pathname.split('/')[3]!; //TODO
  //     setList(pathSegment);
  //   }, [location.pathname]);

  //   const handleListChange = (_event: React.MouseEvent<HTMLElement>, newList: string) => {
  //     if (newList !== null) {
  //       setList(newList);
  //       navigate(newList);
  //     }
  //   };

  const [searchparams] = useSearchParams();
  const activeTab = searchparams.get('tab');

  console.log({ activeTab });

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
          Pending Transactions
        </Typography>

        <Tabs<TabTypes>
          defaultTab="incoming"
          tabs={tabs}
          separateComponent={
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <Button
                onClick={() => {
                  navigate({
                    pathname: paths.transactionsList,
                    search: createSearchParams({
                      tab: activeTab ?? 'incoming',
                    }).toString(),
                  });
                }}
                sx={{ padding: 0 }}
              >
                <Typography sx={{ textDecoration: 'underline' }} textAlign="end" fontSize="small" color="primary">
                  See All Transactions
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
