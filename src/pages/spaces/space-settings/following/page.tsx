import { Typography, Stack, ListItemButton, Avatar, IconButton, Box, Skeleton } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { match, P } from 'ts-pattern';

import ShadeComponent from 'src/components/shade-component';
import TagItem from 'src/components/tag';
import defaultImageUrl from 'src/assets/images/itu-circle.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { getUserSpaces, leaveSpace } from '~/api/spaces';
import { qk } from '~/api/query-keys';
import { AppHeader } from '~/components/header';
import { paths } from '~/app/routes';
import { useAuthUser } from '~/app/auth';
import { ErrorView } from '~/components/error-view';

export const Following = () => {
  const authUser = useAuthUser();

  const $spaces = useQuery({
    queryKey: qk.spaces.getUserSpaces.toKeyWithArgs({ userId: authUser?.user.id ?? '' }),
    queryFn: () => getUserSpaces({ userId: authUser?.user.id ?? '' }),
    enabled: authUser !== null,
  });

  const $leaveSpace = useMutation({
    mutationFn: leaveSpace,
  });

  return (
    <>
      <AppHeader backPath={paths.spaceSettings} />

      <Stack px={3} pb={10} gap={1} alignItems="center">
        <Typography variant="h6" gutterBottom>
          Following
        </Typography>

        {match($spaces)
          .with({ isLoading: true }, () => (
            <>
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
            </>
          ))
          .with({ isError: true }, () => <ErrorView message="Error loading spaces." />)
          .with({ isSuccess: true, data: P.select() }, (spaces) =>
            spaces.data.map((space) => (
              <ListItemButton
                key={space.id}
                sx={{
                  width: '100%',
                  borderRadius: 5,
                  padding: 1,
                  boxShadow: '0px 0px 8.2px -1px #00000026',
                }}
              >
                <Stack sx={{ width: '100%' }} alignItems={'center'} justifyContent={'space-between'} direction={'row'}>
                  <Stack gap={2} alignItems="center" direction="row">
                    <Box paddingY={0.5} position={'relative'}>
                      <Avatar
                        sx={{ width: 70, height: 70, borderRadius: 4 }}
                        variant="rounded"
                        src={space.picture || defaultImageUrl}
                      />
                      <Avatar
                        sx={{
                          height: 35,
                          width: 35,
                          bgcolor: space.shade?.color,
                          position: 'absolute',
                          bottom: -5,
                          right: -10,
                        }}
                      >
                        <Typography fontWeight={600} fontSize={10} color="white">
                          {space.membersCount}
                        </Typography>
                      </Avatar>
                    </Box>
                    <Stack gap={0.5}>
                      <Typography fontSize={15} fontWeight={600}>
                        {space.name}
                      </Typography>
                      {space.shade && <ShadeComponent color={space.shade.color} name={space.shade.en} />}
                      <Stack direction="row">{space.tags?.map((tag, i) => <TagItem key={i} tag={tag} />)}</Stack>
                    </Stack>
                  </Stack>
                  <IconButton
                    onClick={() => {
                      $leaveSpace.mutate(
                        { spaceId: space.id },
                        {
                          onSuccess: () => {
                            $spaces.refetch();
                          },
                        },
                      );
                    }}
                  >
                    <LogoutIcon fontSize="large" />
                  </IconButton>
                </Stack>
              </ListItemButton>
            )),
          )
          .otherwise(() => (
            <>
              <Skeleton variant="rectangular" height={80} width={1} />
              <Skeleton variant="rectangular" height={80} width={1} />
            </>
          ))}
      </Stack>
    </>
  );
};
