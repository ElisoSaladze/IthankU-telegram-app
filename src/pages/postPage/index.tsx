import { Box, Skeleton, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Params, useParams } from "react-router-dom";
import { getPost } from "src/api/post";
import PostItem from "src/components/post-item";

import BackButtonAppBar from "src/components/appbar";

const PostPage = () => {
  const { postId } = useParams<Params>();

  const post = useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => getPost(postId!),
  });

  return (
    <Stack p={2}>
      <BackButtonAppBar pageName="Post" />
      {post.isFetching || post.isLoading ? (
        <Box mt={2}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            sx={{ mb: 2 }}
          />
          <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={194} />
        </Box>
      ) : post.data ? (
        <PostItem isDetails={true} post={post.data.data} />
      ) : (
        <Box>Could not load</Box>
      )}
    </Stack>
  );
};

export default PostPage;
