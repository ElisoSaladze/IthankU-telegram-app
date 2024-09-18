import { Box, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Params, useParams } from 'react-router-dom';
import { getPost } from 'src/api/posts';
import PostItem from 'src/components/post-item';
import { match, P } from 'ts-pattern';
import Loader from 'src/components/loader';
import { qk } from '~/api/query-keys';
import { AppHeader } from '~/components/header';
import { paths } from '~/app/routes';
import { ErrorView } from '~/components/error-view';

const PostPage = () => {
  const { postId } = useParams<Params>();

  const $post = useQuery({
    queryKey: qk.posts.details.toKeyWithArgs({ postId: postId! }),
    queryFn: () => getPost({ postId: postId! }),
  });

  return (
    <Stack>
      <AppHeader backPath={paths.home} />
      <Stack px={3}>
        {match($post)
          .with({ isLoading: true, isFetching: true }, () => <Loader />)
          .with({ isError: true }, () => <ErrorView message="Could not load posts" />)
          .with({ isSuccess: true, data: P.select() }, ({ data }) => <PostItem isDetails={true} post={data} />)
          .otherwise(() => (
            <Box>Could not load</Box>
          ))}
      </Stack>
    </Stack>
  );
};

export default PostPage;
