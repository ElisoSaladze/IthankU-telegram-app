import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { Post } from "../../api/post/types";
import { timeAgo } from "../../helpers";
import TagItem from "../tag";
import LikesItem from "../likes";
import { paths } from "src/app/routes";

type Props = {
  post: Post;
  isDetails?: boolean;
};
const PostItem = ({ post, isDetails = false }: Props) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(
    Array(post.images?.length).fill(false)
  );

  const navigateToDetails = () => {
    const postId = post._id;
    if (!isDetails) {
      if (post.visibility === "Public") {
        navigate({
          pathname: generatePath(paths.post, {
            postId,
          }),
        });
      } else {
        navigate({
          pathname: generatePath(paths.privatePost, {
            postId,
          }),
        });
      }
    }
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };
  return (
    <Card onClick={navigateToDetails} sx={{ width: "100%", maxWidth: 400 }}>
      <CardHeader
        avatar={
          post.author !== undefined && (
            <Avatar src={post.author ? post.author.picture : ""} />
          )
        }
        title={post.author !== undefined && post.author ? post.author.name : ""}
        subheader={
          <Stack
            gap={0.5}
            direction={"row"}
            alignItems={"center"}
            fontSize={"small"}
            color={"secondary.dark"}
          >
            {timeAgo(post.createdAt)} •
            {post.visibility === "Public" ? (
              <PublicIcon sx={{ fontSize: "12px" }} />
            ) : (
              <LockIcon sx={{ fontSize: "12px" }} />
            )}
          </Stack>
        }
      />
      <CardContent>
        <Typography fontWeight={600}>{post.summary}</Typography>
        <Typography paragraph>{post.preview}</Typography>
        <Stack spacing={0.5} direction={"row"}>
          {post.tags!.map((tag, index) => (
            <TagItem key={index} tag={tag} />
          ))}
        </Stack>
      </CardContent>
      {post.images!.map((m, i) => (
        <Box m={2} key={i}>
          {!imageLoaded[i] && (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={194}
              sx={{ borderRadius: 1 }}
            />
          )}
          <img
            height="194"
            width={"100%"}
            src={m}
            alt={m}
            onLoad={() => handleImageLoad(i)}
            style={{
              display: imageLoaded[i] ? "block" : "none",
              boxShadow: "0px 1px 4.5px 1px #00000040",
              objectFit: "cover",
              overflow: "hidden",
              borderRadius: 8,
            }}
          />
        </Box>
      ))}
      <CardActions
        sx={{
          justifyContent: "space-between",
        }}
        disableSpacing
      >
        <Stack gap={1} marginLeft={1} alignItems={"center"} direction={"row"}>
          {isDetails &&
            (post.hasLiked ? (
              <FavoriteIcon color="primary" />
            ) : (
              <IconButton
                onClick={() =>
                  navigate(`/appreciate/${post._id}`, {
                    state: {
                      postAuthor: post.author?._id,
                    },
                  })
                }
              >
                <FavoriteBorderIcon />
              </IconButton>
            ))}
          <LikesItem likes={post.likes} />
          <Typography fontSize={"small"}>{post.likesCount} likes</Typography>
        </Stack>
        <Button color="secondary" variant="text">
          <ShareIcon />
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
