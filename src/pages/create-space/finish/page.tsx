import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { generatePath, useNavigate } from 'react-router-dom';
import ShadeComponent from 'src/components/shade-component';
import TagItem from 'src/components/tag';
import { useCreateSpaceContext } from 'src/providers/create-space-provider';
import { createSpace } from '~/api/spaces';
import { paths } from '~/app/routes';
import { Progress } from '~/components/progress';

export const FinishNewSpace = () => {
  const navigate = useNavigate();
  const { watch, handleSubmit } = useCreateSpaceContext();

  const $createSpace = useMutation({
    mutationFn: createSpace,
  });

  const [shade, tags, name, description, image, cover] = watch([
    'shade',
    'tags',
    'name',
    'description',
    'image',
    'cover',
  ]);

  return (
    <Stack mt={10} p={2} gap={2} width={1} alignItems="center">
      <Stack
        maxWidth={380}
        width={1}
        py={2}
        px={1}
        borderRadius={10}
        alignItems="center"
        justifyContent="center"
        gap={1}
        boxShadow="0px 0px 0px 1px #0000000F, 0px 10px 36px 0px #00000029"
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          zIndex={1}
          bgcolor="#222222"
          height={120}
          sx={{
            backgroundImage: cover ? `url(${URL.createObjectURL(cover!)})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        />
        <Box bgcolor="white" p={1} zIndex={2} mt={6} borderRadius="50%">
          <Avatar sx={{ height: 120, width: 120 }} src={image ? URL.createObjectURL(image!) : ''} />
        </Box>

        <Typography fontSize={24} fontWeight={600}>
          {name}
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            width: '100%',
            wordBreak: 'break-all',
          }}
        >
          {description}
        </Typography>
        {shade && <ShadeComponent color={shade.color} name={shade.en} />}

        <Box display="flex" gap={1}>
          {tags.map((tag, index) => (
            <TagItem key={index} tag={tag.value} />
          ))}
        </Box>
      </Stack>
      <Stack gap={1} maxWidth={380} width={'100%'} direction={'row'}>
        <Button onClick={() => navigate(paths.home)} size="large" fullWidth variant="contained" color="info">
          Cancel
        </Button>
        <Button
          disabled={$createSpace.isLoading}
          fullWidth
          onClick={handleSubmit((values) => {
            $createSpace.mutate(
              {
                ...values,
                shadeId: values.shade?.id,
              },
              {
                onSuccess: (data) => {
                  const spaceId = data.data.id;
                  navigate(generatePath(paths.spaceDetails, { spaceId }));
                },
              },
            );
          })}
          size="large"
          variant="contained"
        >
          {$createSpace.isLoading ? <Progress /> : 'Create'}
        </Button>
      </Stack>
    </Stack>
  );
};
