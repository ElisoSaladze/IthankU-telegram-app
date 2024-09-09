import { Avatar, Box, Skeleton, Stack, Typography, Button, IconButton } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loader from 'src/components/loader';
import PostItem from 'src/components/post-item';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { match, P } from 'ts-pattern';
import { getPosts } from '~/api/posts';
import { qk } from '~/api/query-keys';
import { AppHeader } from '~/components/header';
import { CreatePostGroupMenu } from '~/components/create-post-group-menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useUserDetails } from '~/lib/hooks';
import PullToRefresh from 'react-simple-pull-to-refresh';

export const HomePage = () => {
  const [ref, inView] = useInView();
  const { user: userDetails } = useUserDetails();

  const $posts = useInfiniteQuery({
    queryKey: qk.posts.list.toKey(),
    queryFn: async ({ pageParam = 1 }) => getPosts({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (inView && $posts.hasNextPage) {
      $posts.fetchNextPage();
    }
  }, [inView, $posts.hasNextPage, $posts.fetchNextPage, $posts]);

  return (
    <PullToRefresh onRefresh={$posts.refetch}>
      <Box position="relative">
        <AppHeader
          pageName="Home"
          additionalContent={
            <CreatePostGroupMenu
              button={
                <IconButton>
                  <AddCircleOutlineIcon fontSize="large" color="primary" />
                </IconButton>
              }
            />
          }
          headerSx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        />
        {match($posts)
          .with({ isLoading: true }, () => <Loader />)
          .with({ isError: true }, () => <Typography color="error">Failed to load posts.</Typography>)
          .with({ isSuccess: true, data: P.select() }, ({ pages }) => (
            <Stack mx={3} gap={2} alignItems="center">
              <Stack justifyContent="space-between" direction="row" alignItems="center">
                <Stack>
                  <Typography fontSize={30} fontWeight={600}>
                    Hello, {userDetails?.name}!
                  </Typography>
                  <Typography fontSize={14} color="secondary.dark">
                    Transforming kindness into rewards? Discover how with{' '}
                    <Typography component="span" color="primary">
                      ITHANKU!
                    </Typography>
                  </Typography>
                </Stack>
                <Avatar src={userDetails!.picture!} sx={{ width: 65, height: 65 }} />
              </Stack>

              {$posts.isLoading && !$posts.isFetchingNextPage ? (
                <Stack gap={2} width={1}>
                  {[...Array(3)].map((_, index) => (
                    <Box key={index}>
                      <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
                      <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
                      <Skeleton variant="rectangular" width="100%" height={194} />
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Stack gap={2} width={1} marginBottom={10}>
                  {pages.map((page, pageIndex) => (
                    <React.Fragment key={pageIndex}>
                      {page.data.map((post, index: number) => (
                        <PostItem isDetails={false} key={index} post={post} />
                      ))}
                    </React.Fragment>
                  ))}
                  {$posts.hasNextPage && (
                    <Button
                      disabled={!$posts.hasNextPage || $posts.isFetchingNextPage}
                      ref={ref}
                      onClick={() => $posts.fetchNextPage()}
                    >
                      {$posts.isFetchingNextPage
                        ? 'Loading more posts'
                        : $posts.hasNextPage
                          ? 'Show more'
                          : 'No more posts'}
                    </Button>
                  )}
                </Stack>
              )}
            </Stack>
          ))
          .exhaustive()}
      </Box>
    </PullToRefresh>
  );
};
