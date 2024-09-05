import { Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ControlledTextArea } from 'src/components/form/controlled/controlled-text-area';
import Loader from 'src/components/loader';

import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserGroups } from '~/api/groups';
import LikesItem from 'src/components/likes';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { qk } from 'src/api/query-keys';
import { updateUserBio } from '~/api/auth';
import { useUserDetails } from '~/lib/hooks';
import { IconCheck } from '~/assets/icons';
import { AppHeader } from '~/components/header';

type AccountsFormValues = {
  bio: string;
};

export const AccountsPage = () => {
  const navigate = useNavigate();

  const { user: userDetails, isLoading, refetch } = useUserDetails();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<AccountsFormValues>({
    defaultValues: {
      bio: userDetails?.bio ?? '',
    },
  });

  const { data, isLoading: groupsLoading } = useQuery({
    queryKey: qk.groups.getUserGroups.toKeyWithArgs({ userId: userDetails?.id ?? '' }),
    queryFn: () => getUserGroups({ userId: userDetails?.id ?? '' }),
    enabled: userDetails !== undefined,
  });

  const $updateUserBio = useMutation({
    mutationFn: updateUserBio,
  });

  const disabled = !isDirty || $updateUserBio.isLoading;

  if (isLoading) return <Loader />;

  return (
    <>
      <AppHeader />

      <Stack mb={10} height={1} gap={1} px={2} alignItems="center">
        <Typography fontSize={24}>Accounts</Typography>

        <Typography fontSize={12} alignSelf={'flex-start'}>
          About me
        </Typography>

        <ControlledTextArea
          fullWidth
          control={control}
          name="bio"
          multiline
          rows={2}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  edge="end"
                  onClick={handleSubmit((values) => {
                    $updateUserBio.mutate(
                      {
                        bio: values.bio,
                      },
                      {
                        onSuccess: () => {
                          refetch();
                          reset({
                            bio: values.bio,
                          });
                        },
                      },
                    );
                  })}
                  disabled={disabled}
                >
                  <IconCheck fontSize="small" color={!disabled ? 'primary' : 'disabled'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography fontSize={12} alignSelf={'flex-start'}>
          Socials
        </Typography>

        <Box width={1} display="flex" flexWrap="wrap" gap={1}>
          {userDetails?.linkedAccounts.map((social, index) => (
            <Typography key={social.value + index}>{social.provider}</Typography>
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
                    id: data.id,
                    picture: data?.picture,
                    name: data.name,
                  }))
                  .slice(0, 5)}
              />
            )}
            <ArrowForwardIosIcon />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
