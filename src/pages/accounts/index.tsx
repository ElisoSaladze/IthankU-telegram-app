import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ControlledTextArea } from 'src/components/form/controlled/controlled-text-area';
import Loader from 'src/components/loader';

import { useMutation, useQuery } from '@tanstack/react-query';
import { userGroups } from '~/api/groups';
import LikesItem from 'src/components/likes';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { qk } from 'src/api/query-keys';
import { updateUserBio } from '~/api/auth';
import { useUserDetails } from '~/lib/hooks';

type AccountsFormValues = {
  bio: string;
};

const Accounts = () => {
  const navigate = useNavigate();
  const { user: userDetails, isLoading } = useUserDetails();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<AccountsFormValues>({
    defaultValues: {
      bio: userDetails?.user.bio ?? '',
    },
  });

  const { data, isLoading: groupsLoading } = useQuery({
    queryKey: qk.groups.userGroups.toKey(),
    queryFn: userGroups,
  });

  const $updateUserBio = useMutation({
    mutationFn: updateUserBio,
  });

  if (isLoading) return <Loader />;

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit((values) => {
        $updateUserBio.mutate({
          bio: values.bio,
        });
      })}
      mb={10}
      height={1}
      gap={1}
      px={2}
      alignItems="center"
    >
      <Typography fontSize={24}>Accounts</Typography>

      <Typography fontSize={12} alignSelf={'flex-start'}>
        About me
      </Typography>

      <ControlledTextArea fullWidth control={control} name="bio" multiline rows={2} />

      <Typography fontSize={12} alignSelf={'flex-start'}>
        Socials
      </Typography>

      <Box width={1} display="flex" flexWrap="wrap" gap={1}>
        {userDetails?.user.linkedAccounts.map((social, index) => (
          <Typography key={social.value + index}>{social.type}</Typography>
        ))}
      </Box>

      <Typography fontSize={12} alignSelf="flex-start">
        Groups
      </Typography>

      <Box
        sx={{
          width: '100%',
        }}
        onClick={() => navigate('/groups')}
      >
        <Stack alignItems={'center'} width={'100%'} justifyContent={'space-between'} direction={'row'}>
          {groupsLoading ? (
            <Typography>...</Typography>
          ) : (
            <LikesItem
              size="medium"
              likes={data!.data
                .map((data) => ({
                  _id: data._id,
                  picture: data.groupImage,
                  name: data.name,
                }))
                .slice(0, 5)}
            />
          )}
          <ArrowForwardIosIcon />
        </Stack>
      </Box>

      <Button fullWidth disabled={!isDirty} color="primary" size="large">
        Save Changes
      </Button>
    </Stack>
  );
};

export default Accounts;
