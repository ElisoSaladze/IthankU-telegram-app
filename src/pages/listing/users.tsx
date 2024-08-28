import { Avatar, Button, ListItemButton, Stack, Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loader from 'src/components/loader';
import ShadeComponent from 'src/components/shade-component';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { generatePath, useNavigate } from 'react-router-dom';
import { paths } from 'src/app/routes';
import { match, P } from 'ts-pattern';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getUsers } from '~/api/users';
import { qk } from '~/api/query-keys';
import TagItem from '~/components/tag';
import { useFilterUsersContext } from '~/providers/filter-provider';

const UsersList = () => {
  const { watch } = useFilterUsersContext();
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  const radius = watch('distance') || undefined;
  const shade = watch('area') || undefined;
  const hashtag = watch('hashtag') || undefined;

  const $users = useInfiniteQuery({
    queryKey: qk.users.list.toKeyWithArgs({ shade: shade, radius: radius?.toString(), hashtag: hashtag }),
    queryFn: async ({ pageParam = 1 }) =>
      getUsers({ page: pageParam, radius: radius?.toString(), shade: shade, hashtag: hashtag }),
    getNextPageParam: (result) => {
      const nextPage = result.page + 1;
      return nextPage <= result.totalPages ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (inView && $users.hasNextPage) {
      $users.fetchNextPage();
    }
  }, [$users, inView]);

  return match($users)
    .with({ isLoading: true }, () => <Loader />)
    .with({ isError: true }, () => <Typography color="error">Failed to load users.</Typography>)
    .with({ isSuccess: true, data: P.select() }, ({ pages }) => (
      <Stack paddingBottom={10} marginY={1} gap={1}>
        {pages
          .flatMap((page) => page.users)
          .map((user, index) => (
            <ListItemButton
              onClick={() => {
                const userId = user._id;
                navigate(generatePath(paths.userDetails, { userId }));
              }}
              key={user._id! + index}
              sx={{
                width: '100%',
                borderRadius: 5,
                boxShadow: '0px 0px 8.2px -1px #00000026',
              }}
            >
              <Stack
                width={1}
                borderRadius={5}
                p={1}
                alignItems="center"
                justifyContent="space-between"
                direction="row"
              >
                <Stack gap={1} alignItems="center" direction="row">
                  <Avatar sx={{ width: 70, height: 70 }} src={user.picture} />
                  <Stack gap={0.5}>
                    <Typography fontSize={15} fontWeight={600}>
                      {user.name}
                    </Typography>
                    {user.topShades && user.topShades.length > 0 && (
                      <ShadeComponent
                        color={user.topShades[0]!.shadeInfo?.color}
                        name={user.topShades[0]!.shadeInfo?.en}
                      />
                    )}
                    {user.topHashtags && user.topHashtags.length > 0 && <TagItem tag={user.topHashtags[0]!.hashtag} />}
                  </Stack>
                </Stack>
                <Stack alignItems="center" direction="row" gap={1}>
                  <Typography>{Math.round(user.generalRating)}</Typography>
                  <ArrowForwardIosIcon
                    sx={{
                      color: 'secondary.main',
                    }}
                  />
                </Stack>
              </Stack>
            </ListItemButton>
          ))}
        {$users.hasNextPage && (
          <Button
            disabled={!$users.hasNextPage || $users.isFetchingNextPage}
            ref={ref}
            onClick={() => $users.fetchNextPage()}
          >
            {$users.isFetchingNextPage ? 'Loading more data' : $users.hasNextPage ? 'Show more' : 'No more data'}
          </Button>
        )}
      </Stack>
    ))
    .exhaustive();
};

export default UsersList;
