import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { getGroups } from '~/api/groups';
import Loader from 'src/components/loader';

import GroupItem from 'src/components/join-group-item';
import { paths } from '~/app/routes';
import { qk } from '~/api/query-keys';
import { match, P } from 'ts-pattern';
import { ErrorView } from '~/components/error-view';

const JoinGroupPage = () => {
  const navigate = useNavigate();

  const $groups = useQuery({
    queryKey: qk.groups.list.toKey(),
    queryFn: getGroups,
  });

  return (
    <Stack spacing={2} height={1} alignItems="center" justifyContent="space-between" p={2}>
      {match($groups)
        .with({ isLoading: true }, () => <Loader />)
        .with({ isError: true }, () => <ErrorView message="Failed to get groups" />)
        .with({ isSuccess: true, data: P.select() }, (data) => {
          return (
            <Box sx={{ width: 1 }}>
              <Stack alignItems="center">
                <Button onClick={() => navigate(paths.home)} sx={{ alignSelf: 'end' }} color="secondary">
                  skip
                </Button>
                <Typography fontSize={32} fontWeight={600}>
                  Join group
                </Typography>

                <Typography fontSize={16} color="secondary.dark" textAlign="center" my={2} mb={3}>
                  Connect with others and explore shared interests.
                </Typography>

                <Stack gap={1} flexGrow={1} width={1} overflow="auto">
                  {data?.data.map((group) => (
                    <>
                      <GroupItem group={group} />
                      <Divider />
                    </>
                  ))}
                </Stack>
              </Stack>
              <Button
                onClick={() => navigate(paths.createGroupDetails)}
                size="large"
                endIcon={<AddIcon fontSize="large" />}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ my: 3 }}
              >
                Create
              </Button>
            </Box>
          );
        })
        .run()}
    </Stack>
  );
};

export default JoinGroupPage;
