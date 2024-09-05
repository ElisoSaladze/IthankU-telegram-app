import { Box, Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import PostItem from 'src/components/post-item';
import { getPost, viewPrivatePost } from 'src/api/posts';
import { match, P } from 'ts-pattern';
import { qk } from '~/api/query-keys';
import { paths } from '~/app/routes';
import { AppHeader } from '~/components/header';

const PrivatePostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const $post = useQuery({
    queryKey: qk.posts.details.toKeyWithArgs({ postId: postId! }),
    queryFn: () => getPost({ postId: postId! }),
  });

  const { mutate: unlockPost } = useMutation({
    mutationFn: () => viewPrivatePost({ postId: postId! }),
    onSuccess: () => {
      if (postId) {
        navigate({
          pathname: generatePath(paths.post, {
            postId,
          }),
        });
      }
    },
  });

  return (
    <Stack height={1}>
      <AppHeader backPath={paths.home} />
      <Stack justifyContent="space-between" height={1} px={3} pb={2}>
        <Stack gap={2}>
          <Typography textAlign={'center'} fontSize={25} fontWeight={600}>
            Continue Reading?
          </Typography>
          <Typography textAlign={'center'}>
            You&apos;ve reached the end of the preview. To unlock the full content and enjoy the rest of this post,
            please pay{' '}
            <Typography fontWeight={600} color="primary" component="span">
              one coin
            </Typography>
            .
          </Typography>

          {match($post)
            .with({ isLoading: true, isFetching: true }, () => <Loader />)
            .with({ isError: true }, () => <Box>Could not load</Box>)
            .with({ isSuccess: true, data: P.select() }, ({ data }) => <PostItem isDetails={true} post={data} />)
            .otherwise(() => (
              <Box>Could not load</Box>
            ))}
        </Stack>

        <Button onClick={() => unlockPost()} fullWidth variant="contained" size="large">
          Unlock Full Post
        </Button>
      </Stack>
    </Stack>
  );
};

export default PrivatePostPage;
