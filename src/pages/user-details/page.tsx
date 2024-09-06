import { Button, IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createSearchParams, generatePath, Params, useNavigate, useParams } from 'react-router-dom';
import { changeName, changePfp } from '~/api/auth/auth.api';
import { IconLocation } from 'src/assets/icons';

import { ChipComponent } from 'src/components/chip-component';
import { ControlledTextField } from 'src/components/form/controlled/controlled-text-field';
import Loader from 'src/components/loader';

import PfpComponent from 'src/components/pfp-component';
import { fileToBase64, formatNumber } from 'src/helpers';
import { match, P } from 'ts-pattern';
import { qk } from '~/api/query-keys';
import { getUserDetails } from '~/api/users';
import { useAuthUser } from '~/app/auth';
import { useUserDetails } from '~/lib/hooks';
import { paths } from '~/app/routes';
import { AppHeader } from '~/components/header';

export const UserDetailsPage = () => {
  const navigate = useNavigate();
  const authUser = useAuthUser();

  const { refetch } = useUserDetails();
  const { userId } = useParams<Params>();

  const [isEditable, setIsEditable] = useState(false);

  const isCurrent = authUser?.user.id === userId;

  const $user = useQuery({
    queryKey: qk.users.details.toKeyWithArgs({ userId: userId! }),
    queryFn: () => getUserDetails({ userId: userId! }),
  });

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const $changePfp = useMutation({
    mutationFn: changePfp,
  });

  const $changeName = useMutation({
    mutationFn: changeName,
  });

  const handleImageChange = async (newImage: File) => {
    try {
      const base64Image = await fileToBase64(newImage);
      $changePfp.mutate(
        {
          picture: base64Image,
        },
        {
          onSuccess: () => {
            refetch();
          },
        },
      );
    } catch (error) {
      console.error('Error converting image to Base64:', error);
    }
  };

  return (
    <>
      {match($user)
        .with({ isLoading: true }, () => {
          return <Loader />;
        })
        .with({ isError: true }, () => {
          return <Typography>Failed to get user details</Typography>;
        })
        .with({ isSuccess: true, data: P.select() }, ({ data: user }) => {
          return (
            <>
              <AppHeader backPath={paths.more} />
              <Stack height={1} overflow="auto" gap={1} mx={3}>
                <Stack borderRadius={5} bgcolor="info.main" p={2} gap={1} position="relative">
                  {user.location && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 4,
                      }}
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                        const coordinates = user.location?.coordinates!;

                        if (userId) {
                          navigate({
                            pathname: generatePath(paths.userLocation, {
                              userId,
                            }),
                            search: createSearchParams({
                              lat: coordinates[0].toString(),
                              lng: coordinates[1].toString(),
                            }).toString(),
                          });
                        }
                      }}
                    >
                      <IconLocation sx={{ fontSize: 40 }} />
                    </IconButton>
                  )}

                  <Stack gap={1} direction="row" alignItems="center">
                    <PfpComponent
                      showEditIcon={false}
                      size={[80, 80]}
                      imageUrl={user.picture ?? ''}
                      isEditable={isCurrent}
                      onChange={handleImageChange}
                    />
                    <Stack>
                      {isCurrent && isEditable ? (
                        <ControlledTextField
                          onBlur={handleSubmit((data) => {
                            $changeName.mutate(
                              {
                                name: data.name!,
                              },
                              {
                                onSuccess: () => {
                                  refetch();
                                },
                              },
                            );
                            setIsEditable(false);
                            $user.refetch();
                            refetch();
                          })}
                          InputProps={{
                            sx: {
                              color: 'white',
                              padding: 0,
                              paddingRight: 1.5,
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                          }}
                          control={control}
                          name="name"
                        />
                      ) : (
                        <Typography
                          onClick={() => {
                            if (isCurrent) {
                              setIsEditable(true);
                              setValue('name', user.name || '');
                            }
                          }}
                          fontSize={20}
                          fontWeight={700}
                          color="white"
                        >
                          {user.name}
                        </Typography>
                      )}
                      <Stack direction={'row'}>{user.linkedAccounts.map((acc) => acc.provider)}</Stack>
                    </Stack>
                  </Stack>
                  {!isCurrent && (
                    <Button
                      onClick={() => {
                        navigate(
                          generatePath(paths.appreciate, {
                            appreciateId: '', // we don't need appreciateId
                          }),
                          {
                            state: {
                              receiverId: userId,
                            },
                          },
                        );
                      }}
                      color="warning"
                      size="large"
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Appreciate
                    </Button>
                  )}
                </Stack>
                <Stack direction="row" alignItems="center" gap={2} mt={1}>
                  {isCurrent && (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      width="50%"
                      border={3}
                      borderColor="#0058A9"
                      borderRadius={3}
                      p={0.5}
                    >
                      <Typography fontSize={36} fontWeight={600} color="#0058A9">
                        {user.points}
                      </Typography>
                      <Typography fontSize={14} fontWeight={500} color="#0058A9">
                        My wallet
                      </Typography>
                    </Stack>
                  )}

                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    width={isCurrent ? '50%' : '100%'}
                    border={3}
                    borderColor="#0058A9"
                    bgcolor="#0058A9"
                    borderRadius={3}
                    p={0.5}
                  >
                    <Typography fontSize={36} fontWeight={600} color="white">
                      {formatNumber(user.ratingPoints)}
                    </Typography>
                    <Typography fontSize={14} fontWeight={500} color="white">
                      General score
                    </Typography>
                  </Stack>
                </Stack>

                {!isCurrent && user.bio && (
                  <Stack mt={1} gap={0.5}>
                    <Typography fontSize={14} color="#9C9C9C" fontWeight={500}>
                      About me
                    </Typography>
                    <Typography fontSize={14} color="info.main">
                      {user.bio}
                    </Typography>
                  </Stack>
                )}

                {user.topHashtags.length === 0 && user.topHashtags.length === 0 ? (
                  <Typography fontSize={20} color="#8B8B8B" mt={5} textAlign="center">
                    No area and hashtag found to be displayed.
                  </Typography>
                ) : (
                  <>
                    {user.shadePoints.length > 0 && (
                      <>
                        <Typography fontSize={14} color="#9C9C9C" fontWeight={500} mt={1}>
                          Areas
                        </Typography>
                        <Stack flexWrap="wrap" gap={1} direction="row">
                          {user.shadePoints.map((shade) => (
                            <ChipComponent key={shade.shade.id} color={shade.shade.color}>
                              <Typography fontSize={16} fontWeight={500} color={shade.shade.color}>
                                {`${shade.shade.en} ${shade.points}`}
                              </Typography>
                            </ChipComponent>
                          ))}
                        </Stack>
                      </>
                    )}

                    {user.topHashtags.length > 0 && (
                      <>
                        <Typography fontSize={14} color="#9C9C9C" fontWeight={500} mt={1}>
                          Hashtags
                        </Typography>
                        <Stack flexWrap="wrap" gap={1} direction="row">
                          {user.topHashtags.map(
                            (hashtag, i) =>
                              hashtag.hashtag && (
                                <ChipComponent key={hashtag.hashtag + i + hashtag.count}>
                                  <Typography fontSize={16} fontWeight={500} color="info.main">
                                    #{hashtag.hashtag}
                                  </Typography>
                                </ChipComponent>
                              ),
                          )}
                        </Stack>
                      </>
                    )}
                  </>
                )}
              </Stack>
            </>
          );
        })
        .run()}
    </>
  );
};
