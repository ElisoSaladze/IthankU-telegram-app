import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Params, useParams } from "react-router-dom";
import Loader from "src/components/loader";
import PostItem from "src/components/post-item";
import { getPost } from "src/api/post";
import BackButtonAppBar from "src/components/appbar";

const PrivatePostPage = () => {
  const { postId } = useParams<Params>();

  const post = useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => getPost(postId!),
  });

  return (
    <Stack>
      <BackButtonAppBar pageName="Post" />
      <Typography>Continue Reading?</Typography>
      <Typography>
        You`&apos;ve reached the end of the preview. To unlock the full content
        and enjoy the rest of this post, please pay one coin.
      </Typography>
      {post.isFetching || post.isLoading ? (
        <Loader />
      ) : post.data ? (
        <PostItem isDetails={true} post={post.data.data} />
      ) : (
        <Box>could not load</Box>
      )}
      <Button fullWidth variant="contained" size="large">
        Unlock Full Post
      </Button>
    </Stack>
  );
};

export default PrivatePostPage;
