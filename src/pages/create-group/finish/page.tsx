import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { generatePath, useNavigate } from 'react-router-dom';
import ShadeComponent from 'src/components/shade-component';
import TagItem from 'src/components/tag';
import { useCreateGroupContext } from 'src/providers/create-group-provider';
import { createGroup } from '~/api/groups';
import { paths } from '~/app/routes';
import { Progress } from '~/components/progress';

export const FinishNewGroup = () => {
  const navigate = useNavigate();
  const { watch, handleSubmit } = useCreateGroupContext();

  const $createGroup = useMutation({
    mutationFn: createGroup,
  });

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
            backgroundImage: watch('cover') ? `url(${URL.createObjectURL(watch('cover')!)})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        />
        <Box bgcolor="white" p={1} zIndex={2} mt={6} borderRadius="50%">
          <Avatar
            sx={{ height: 120, width: 120 }}
            src={watch('picture') ? URL.createObjectURL(watch('picture')!) : ''}
          />
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
        <ShadeComponent color={watch('shadeColor')!} name={watch('shade')!} />
        <Box display="flex" gap={1}>
          {watch('tags').map((tag, index) => (
            <TagItem key={index} tag={tag.value} />
          ))}
        </Box>
      </Stack>
      <Stack gap={1} maxWidth={380} width={'100%'} direction={'row'}>
        <Button onClick={() => navigate(paths.home)} size="large" fullWidth variant="contained" color="info">
          Cancel
        </Button>
        <Button
          disabled={$createGroup.isLoading}
          fullWidth
          onClick={handleSubmit((values) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { currentTag, shadeColor, shade, ...otherValues } = values;
            $createGroup.mutate(otherValues, {
              onSuccess: (data) => {
                const groupId = data.data.id;
                navigate(generatePath(paths.groupDetails, { groupId }));
              },
            });
          })}
          size="large"
          variant="contained"
        >
          {$createGroup.isLoading ? <Progress /> : 'Create'}
        </Button>
      </Stack>
    </Stack>
  );
};
