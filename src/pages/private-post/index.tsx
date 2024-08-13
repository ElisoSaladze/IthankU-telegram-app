import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import NotificationsIcon from "src/assets/icons/notifications.svg";

import { Params, useNavigate, useParams } from "react-router-dom";
import Loader from "src/components/loader";
import PostItem from "src/components/post-item";
import { getPost } from "src/api/post";

const PrivatePostPage = () => {
  const { postId } = useParams<Params>();
  const navigate = useNavigate();
  const post = useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => getPost(postId!),
  });

  return (
    <Stack>
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
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
