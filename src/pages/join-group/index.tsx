import AddIcon from '@mui/icons-material/Add';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { getGroups } from '~/api/groups';
import Loader from 'src/components/loader';

import GroupItem from 'src/components/join-group-item';
import { paths } from 'src/app/routes';

const JoinGroupPage = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => getGroups(),
  });

  if (isFetching) return <Loader />;
  return (
    <Stack spacing={2} height={'100vh'} alignItems={'center'} justifyContent={'space-between'} padding={2}>
      <Stack alignItems={'center'}>
        <Button onClick={() => navigate(paths.home)} sx={{ alignSelf: 'end' }} color="secondary">
          skip
        </Button>
        <Typography fontSize={24} fontWeight={600}>
          Join group
        </Typography>
        <Typography textAlign={'center'}>Connect with others and explore shared interests.</Typography>
        <Stack height={`calc(100vh - 220px)`} gap={1} flexGrow={1} width={'100%'} overflow="auto">
          {data?.data.map((group) => (
            <>
              <GroupItem group={group} />
              <Divider />
            </>
          ))}
        </Stack>
      </Stack>
      <Button
        onClick={() => navigate(paths.createGroup)}
        size="large"
        endIcon={<AddIcon fontSize="large" />}
        variant="contained"
        color={'primary'}
        fullWidth
      >
        Create
      </Button>
    </Stack>
  );
};

export default JoinGroupPage;
