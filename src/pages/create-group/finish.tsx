import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { generatePath, useNavigate } from 'react-router-dom';
import ShadeComponent from 'src/components/shade-component';
import TagItem from 'src/components/tag';
import { useCreateGroupContext, CreateGroupRequest } from 'src/providers/create-group-provider';
import { createGroup } from '~/api/groups';
import { paths } from 'src/app/routes';

const FinishNewGroup = () => {
  const { watch, handleSubmit } = useCreateGroupContext();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['new-group'],
    mutationFn: (data: CreateGroupRequest) => {
      const formData = new FormData();
      formData.append('description', data.description);
      formData.append('name', data.name);
      formData.append('privacy', data.privacy);
      formData.append('shade', data.shade);
      formData.append('cover', data.cover!);
      formData.append('image', data.image!);
      for (const tag of data.tags) formData.append('tags', tag.value);
      return createGroup(formData);
    },
    onSuccess: (data) => {
      const groupId = data.data._id;
      navigate(generatePath(paths.groupDetails, { groupId }));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <Stack marginTop={6} p={2} gap={2}>
      <Stack
        maxWidth={380}
        width={'100%'}
        paddingY={2}
        paddingX={1}
        borderRadius={10}
        alignItems={'center'}
        justifyContent={'center'}
        gap={1}
        boxShadow={'0px 0px 0px 1px #0000000F, 0px 10px 36px 0px #00000029'}
        position={'relative'}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          zIndex={1}
          bgcolor="#222222"
          height={100}
          sx={{
            backgroundImage: watch('cover') ? `url(${URL.createObjectURL(watch('cover')!)})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
        <Box bgcolor={'white'} p={1} zIndex={2} mt={6}>
          <Avatar sx={{ height: 120, width: 120 }} src={watch('image') ? URL.createObjectURL(watch('image')!) : ''} />
        </Box>

        <Typography fontSize={24} fontWeight={600}>
          {watch('name')}
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            width: '100%',
            wordBreak: 'break-all',
          }}
        >
          {watch('description')}
        </Typography>
        <ShadeComponent color={watch('shadeColor')} name={watch('shade')} />
        <Stack>
          {watch('tags').map((tag, index) => (
            <TagItem key={index} tag={tag.value} />
          ))}
        </Stack>
      </Stack>
      <Stack gap={1} maxWidth={380} width={'100%'} direction={'row'}>
        <Button onClick={() => navigate(paths.home)} size="large" fullWidth variant="contained" color="info">
          Cancel
        </Button>
        <Button disabled={mutation.isLoading} fullWidth onClick={onSubmit} size="large" variant="contained">
          {mutation.isLoading ? <CircularProgress /> : 'Create'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FinishNewGroup;
