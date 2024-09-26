import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { getSpaces } from '~/api/spaces';
import Loader from 'src/components/loader';

import SpaceItem from 'src/components/join-space-item';
import { paths } from '~/app/routes';
import { qk } from '~/api/query-keys';
import { match, P } from 'ts-pattern';
import { ErrorView } from '~/components/error-view';

const JoinSpacePage = () => {
  const navigate = useNavigate();

  const $spaces = useQuery({
    queryKey: qk.spaces.list.toKey(),
    queryFn: getSpaces,
  });

  return (
    <Stack spacing={2} height={1} alignItems="center" justifyContent="space-between" p={2}>
      {match($spaces)
        .with({ isLoading: true }, () => <Loader />)
        .with({ isError: true }, () => <ErrorView message="Failed to get spaces" />)
        .with({ isSuccess: true, data: P.select() }, (data) => {
          return (
            <Box sx={{ width: 1 }}>
              <Stack alignItems="center">
                <Button onClick={() => navigate(paths.home)} sx={{ alignSelf: 'end' }} color="secondary">
                  skip
                </Button>
                <Typography fontSize={32} fontWeight={600}>
                  Join space
                </Typography>

                <Typography fontSize={16} color="secondary.dark" textAlign="center" my={2} mb={3}>
                  Connect with others and explore shared interests.
                </Typography>

                <Stack gap={1} flexGrow={1} width={1} overflow="auto">
                  {data?.data.map((space) => (
                    <>
                      <SpaceItem space={space} />
                      <Divider />
                    </>
                  ))}
                </Stack>
              </Stack>
              <Button
                onClick={() => navigate(paths.createSpaceDetails)}
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

export default JoinSpacePage;
