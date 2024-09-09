import { Box, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ControlledTextArea } from 'src/components/form/controlled/controlled-text-area';
import Loader from 'src/components/loader';

import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserGroups } from '~/api/groups';
import LikesItem from 'src/components/likes';
import { useNavigate } from 'react-router-dom';
import { qk } from 'src/api/query-keys';
import { updateUserBio } from '~/api/auth';
import { useUserDetails } from '~/lib/hooks';
import { IconArrow, IconCheck } from '~/assets/icons';
import { AppHeader } from '~/components/header';
import { paths } from '~/app/routes';

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

  const { data: groups, isLoading: groupsLoading } = useQuery({
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
      <AppHeader backPath={paths.more} />

      <Stack height={1} gap={1} px={2} alignItems="center">
        <Typography fontSize={24} my={1}>
          Accounts
        </Typography>

        <Typography fontSize={15} fontWeight={500} alignSelf="flex-start">
          About me
        </Typography>

        <ControlledTextArea
          fullWidth
          control={control}
          name="bio"
          multiline
          rows={2}
          InputProps={{
            sx: {
              borderRadius: 4,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  edge="end"
                  onClick={handleSubmit((values) => {
                    $updateUserBio.mutate(
                      {
                        bio: values.bio,
                        id: userDetails!.id,
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

        {userDetails?.linkedAccounts && userDetails?.linkedAccounts.length > 0 && (
          <>
            <Typography fontSize={15} fontWeight={500} alignSelf="flex-start">
              Socials
            </Typography>

            <Box width={1} display="flex" flexWrap="wrap" gap={1}>
              {userDetails?.linkedAccounts.map((social, index) => (
                <Typography key={social.value + index}>{social.provider}</Typography>
              ))}
            </Box>
          </>
        )}

        {groups?.data && (
          <>
            <Typography fontSize={15} fontWeight={500} alignSelf="flex-start" mt={2}>
              Groups
            </Typography>

            <Box
              sx={{
                width: 1,
                display: 'flex',
                gap: 2,
              }}
            >
              <Stack alignItems="center" justifyContent="space-between" direction="row">
                {groupsLoading ? (
                  <Typography>...</Typography>
                ) : (
                  <LikesItem
                    size="medium"
                    likes={groups!.data
                      .map((data) => ({
                        id: data.id,
                        picture: data?.picture,
                        name: data.name,
                      }))
                      .slice(0, 7)}
                  />
                )}
                <IconButton
                  onClick={() => {
                    navigate(paths.groups);
                  }}
                >
                  <IconArrow direction="right" />
                </IconButton>
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </>
  );
};
