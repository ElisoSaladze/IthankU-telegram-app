import { Box, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Params, useParams } from "react-router-dom";
import { getPost } from "src/api/posts";
import PostItem from "src/components/post-item";

import BackButtonAppBar from "src/components/appbar";
import { match, P } from "ts-pattern";
import Loader from "src/components/loader";

const PostPage = () => {
  const { postId } = useParams<Params>();

  const $post = useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => getPost(postId!),
  });

  return (
    <Stack p={2}>
      <BackButtonAppBar pageName="Post" />
      {match($post)
        .with({ isLoading: true, isFetching: true }, () => <Loader />)
        .with({ isError: true }, () => <Box>Could not load</Box>)
        .with({ isSuccess: true, data: P.select() }, ({ data }) => (
          <PostItem isDetails={true} post={data} />
        ))
        .otherwise(() => (
          <Box>Could not load</Box>
        ))}
    </Stack>
  );
};

export default PostPage;
