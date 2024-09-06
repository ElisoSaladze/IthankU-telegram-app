import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
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
} from '@mui/material';

import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { timeAgo } from '../../helpers';
import TagItem from '../tag';
import LikesItem from '../likes';
import { Post } from '~/api/posts';
import { IconPrivatePost, IconShare } from '~/assets/icons';
import { paths } from '~/app/routes';

type Props = {
  post: Post;
  isDetails?: boolean;
};

const PostItem = ({ post, isDetails = false }: Props) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(Array(post.media?.length).fill(false)); // TODO!!

  const navigateToDetails = () => {
    const postId = post.id;

    if (!isDetails) {
      if (post.visibility === 'PRIVATE') {
        navigate({
          pathname: generatePath(paths.privatePost, {
            postId,
          }),
        });
      } else {
        navigate({
          pathname: generatePath(paths.post, {
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

  const renderContent = (content: string) => {
    if (!isDetails) {
      return content.length >= 100 ? content.slice(0, 100) + '...' : content;
    }
    return content;
  };

  const cardImage = post.group ? post.group.groupImage : post.author?.picture;

  return (
    <Card sx={{ boxShadow: '0px 8px 24px 0px #959DA533', p: 2 }} onClick={navigateToDetails}>
      <CardHeader
        avatar={<Avatar src={cardImage ?? ''} />}
        title={post.group ? post.group.name : post.author?.name}
        subheader={
          <Stack gap={0.5} direction="row" alignItems="center" fontSize="small" color="secondary.dark">
            {timeAgo(post.createdAt)} •
            {post.visibility === 'PUBLIC' ? (
              <PublicIcon sx={{ fontSize: '12px' }} />
            ) : (
              <LockIcon sx={{ fontSize: '12px' }} />
            )}
          </Stack>
        }
      />

      <CardContent
        sx={{
          paddingY: 0,
        }}
      >
        <Box gap={1} display="flex">
          <Typography fontWeight={600}>{post.summary}</Typography>
          {post.visibility === 'PRIVATE' && <IconPrivatePost />}
        </Box>
        <Box mt={1}>
          {post.visibility === 'PUBLIC' && post.preview && post.preview.length > 0 && (
            <>
              <Typography color="#A0A0A0" fontSize={12}>
                Preview
              </Typography>
              <Typography>{post.preview}</Typography>
            </>
          )}
          {post.visibility === 'PUBLIC' && post.content && (
            <Typography>
              {renderContent(post.content)}{' '}
              {!isDetails && post.content.length >= 100 && (
                <Button
                  onClick={navigateToDetails}
                  sx={{
                    p: 0,
                    textDecoration: 'underline',
                    fontWeight: 600,
                    fontStyle: 'initial',
                  }}
                  color="info"
                >
                  Read more
                </Button>
              )}
            </Typography>
          )}
        </Box>
        <Stack mt={1.5} spacing={0.5} direction="row">
          {post.tags!.map((tag, index) => (
            <TagItem key={index} tag={tag} />
          ))}
        </Stack>
      </CardContent>

      {post.media?.map((media, i) => (
        <Box m={2} key={i}>
          {!imageLoaded[i] && <Skeleton variant="rectangular" width={1} height={194} sx={{ borderRadius: 1 }} />}
          <img
            height="194"
            width="100%"
            src={media.originalUrl}
            alt={media.originalUrl}
            onLoad={() => handleImageLoad(i)}
            style={{
              display: imageLoaded[i] ? 'block' : 'none',
              boxShadow: '0px 1px 4.5px 1px #00000040',
              objectFit: 'cover',
              overflow: 'hidden',
              borderRadius: 8,
            }}
          />
        </Box>
      ))}

      <CardActions
        sx={{
          justifyContent: 'space-between',
        }}
        disableSpacing
      >
        <Stack ml={1} alignItems="center" direction="row">
          {post.hasLiked ? (
            <FavoriteIcon color="primary" />
          ) : (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                navigate({
                  pathname: generatePath(paths.appreciate, {
                    appreciateId: post.id,
                  }),
                });
                navigate(`/appreciate/${post.id}`, {
                  state: {
                    postAuthorId: post.author?.id,
                  },
                });
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
          <LikesItem likes={post.likes ?? []} />
          <Typography fontSize={13} fontWeight={600}>
            {post.likesCount} likes
          </Typography>
        </Stack>

        <Button color="secondary" variant="text" sx={{ fontSize: 13, fontWeight: 600 }}>
          <IconShare sx={{ color: 'black', fontSize: 20, mr: 0.5, fontWeight: 600 }} />
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
