import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router-dom';
import { createPost } from 'src/api/posts';
import VisibilityStatus from 'src/components/visibility-status';
import { Visibility } from '~/constants/enums';
import { IconClose } from '~/assets/icons';
import { PostTextInput, PreviewInput, SummaryInput, TagsInput } from './inputs';
import { useBoolean, useUserDetails } from '~/lib/hooks';
import { PaidPostDialog } from './paid-post-dialog';
import { Progress } from '../progress';
import { paths } from '~/app/routes';

export type CreatePostFormValues = {
  content: string;
  groupId: string | null;
  summary: string;
  preview?: string;
  visibility: Visibility;
  tags: Array<{
    value: string;
  }>;
  media: Array<{
    value: File;
  }>;
  attachments: Array<{
    value: File;
  }>;
};

const defaultPostValue: CreatePostFormValues = {
  content: '',
  groupId: null,
  summary: '',
  preview: '',
  visibility: Visibility.Public, //TODO!
  tags: [],
  media: [],
  attachments: [],
};

type Props = {
  onClose: () => void;
  groupId?: string;
  fromGroupPage?: boolean; // TODO
};

export const CreatePostForm = ({ onClose, groupId }: Props) => {
  const navigate = useNavigate();
  const { user } = useUserDetails();

  const isPaidPostDialogOpen = useBoolean();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    defaultValues: {
      ...defaultPostValue,
      groupId: groupId,
    },
  });

  const [content, visibility] = watch(['content', 'visibility']);

  const $createPost = useMutation({
    mutationFn: createPost,
    onSuccess: (post) => {
      isPaidPostDialogOpen.setFalse();
      navigate(
        generatePath(paths.post, {
          postId: post.data.id,
        }),
      );
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (data.visibility === 'PUBLIC') {
      $createPost.mutate({
        ...data,
        tags: data.tags.map((tag) => tag.value),
        media: data.media.map((image) => image.value),
        attachments: data.attachments.map((file) => file.value),
      });
      return;
    }

    isPaidPostDialogOpen.setTrue();
  });

  return (
    <Stack p={3} pt={0} position="relative">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          py: 3,
          bgcolor: 'white',
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            left: 0,
          }}
        >
          <IconClose sx={{ color: 'info.main', fontSize: 19 }} />
        </IconButton>

        <Typography fontSize={20} fontWeight={600}>
          Create post
        </Typography>
      </Box>
      {user && (
        <Box display="flex" gap={1} alignItems="center" mb={3}>
          <Avatar src={user.picture!} sx={{ width: 65, height: 65 }} />
          <Typography fontSize={20} fontWeight={600}>
            {user.name}
          </Typography>
        </Box>
      )}

      <Stack width={1} gap={3}>
        <VisibilityStatus
          name="visibility"
          control={control}
          labels={['Fully visible to everyone.', 'Preview only. 1 coin to unlock']}
        />

        {/* {fromGroupPage && <UserGroupsSelect control={control} />} */}

        <SummaryInput control={control} error={errors.summary} />

        {visibility === 'PRIVATE' && <PreviewInput control={control} />}

        <PostTextInput control={control} contentLength={content.length} error={errors.content} />

        <TagsInput control={control} />
      </Stack>

      <Button
        onClick={onSubmit}
        disabled={$createPost.isLoading}
        variant="contained"
        size="large"
        sx={{
          position: 'sticky',
          bottom: 20,
          borderRadius: 5,
          boxShadow: '0px 4px 7px 0px #21A54D40',
        }}
      >
        {$createPost.isLoading ? <Progress /> : 'Post'}
      </Button>

      <PaidPostDialog
        isOpen={isPaidPostDialogOpen.isTrue}
        onClose={isPaidPostDialogOpen.setFalse}
        isLoading={$createPost.isLoading}
        onSubmit={handleSubmit((data) => {
          $createPost.mutate({
            ...data,
            tags: data.tags.map((tag) => tag.value),
            media: data.media.map((image) => image.value),
            attachments: data.attachments.map((file) => file.value),
          });
        })}
      />
    </Stack>
  );
};
