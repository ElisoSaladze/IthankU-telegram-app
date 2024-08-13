import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  AppBar,
  Box,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Params, useNavigate, useParams } from "react-router-dom";
import { getPost } from "src/api/post";
import PostItem from "src/components/post-item";
import notificationsIcon from "src/assets/icons/notifications.svg";

const PostPage = () => {
  const { postId } = useParams<Params>();
  const navigate = useNavigate();
  const post = useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => getPost(postId!),
  });

  return (
    <Stack p={2}>
      <AppBar>
        <Toolbar>
          <ArrowBackIosIcon
            onClick={() => navigate(-1)}
            sx={{ color: "secondary.dark" }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              fontWeight={500}
              variant="h6"
              component="div"
              sx={{ textAlign: "center", color: "black", fontSize: 20 }}
            >
              Post
            </Typography>
          </Box>
          <IconButton>
            <img src={notificationsIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
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
