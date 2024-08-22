import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "src/components/loader";
import PostItem from "src/components/post-item";
import { getPost } from "src/api/posts";
import BackButtonAppBar from "src/components/appbar";
import { match, P } from "ts-pattern";

const PrivatePostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  const $post = useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => getPost(postId!),
  });

  return (
    <Stack marginTop={6}>
      <BackButtonAppBar pageName="Post" />
      <Typography>Continue Reading?</Typography>
      <Typography>
        You&apos;ve reached the end of the preview. To unlock the full content
        and enjoy the rest of this post, please pay one coin.
      </Typography>

      {match($post)
        .with({ isLoading: true, isFetching: true }, () => <Loader />)
        .with({ isError: true }, () => <Box>Could not load</Box>)
        .with({ isSuccess: true, data: P.select() }, ({ data }) => (
          <PostItem isDetails={true} post={data} />
        ))
        .otherwise(() => (
          <Box>Could not load</Box>
        ))}

      <Button fullWidth variant="contained" size="large">
        Unlock Full Post
      </Button>
    </Stack>
  );
};

export default PrivatePostPage;
