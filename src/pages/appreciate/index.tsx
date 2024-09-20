import { Box, Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Params, useLocation, useNavigate, useParams } from 'react-router-dom';

import { ControlledTextArea } from 'src/components/form/controlled/controlled-text-area';
import { appreciateUser, AppreciateUserInput, appreciateWithMobile, getAppreciateUser } from '~/api/appreciate';
import { qk } from '~/api/query-keys';
import { paths } from '~/app/routes';
import { AreaSelect, HashtagSelect } from '~/components/appreciate-components';
import { AppHeader } from '~/components/header';
import { useBoolean } from '~/lib/hooks';

const AppreciatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isFocused = useBoolean();

  const { postAuthorId, postId, phoneNumber, receiverId } = location.state || {};

  const { appreciateId } = useParams<Params>();

  const { control, setValue, handleSubmit } = useForm<AppreciateUserInput>({
    defaultValues: {
      receiverId: postAuthorId ?? receiverId,
      postId: postId ?? undefined,
      // postId: !phoneNumber && String(postAuthor).length > 0 ? appreciateId : undefined,
      // mobileNumber: phoneNumber ? appreciateId : undefined,
    },
  });

  const { data: appreciateData } = useQuery({
    queryKey: qk.appreciate.getUser.toKeyWithArgs({ appreciateId: appreciateId! }),
    queryFn: () => getAppreciateUser({ appreciateId: appreciateId! }),
    enabled: appreciateId !== undefined && appreciateId !== 'nan' && !postAuthorId && !postId,
    onSuccess: (data) => {
      if (data?.data.shade) setValue('shadeId', data.data.shade.id);
      if (data?.data.hashtag) setValue('hashtag', data.data.hashtag);
      setValue('requestId', data.data.requestId);
    },
  });

  const $appreciateUser = useMutation({
    mutationFn: appreciateUser,
  });

  const $appreciateWithMobile = useMutation({
    mutationFn: appreciateWithMobile,
  });

  return (
    <Box
      sx={{
        height: `calc(100% + ${isFocused.isTrue ? 150 : 0}px)`,
      }}
    >
      <AppHeader backPath={paths.home} />
      <Stack m={3} gap={2} pb={3}>
        <AreaSelect
          defaultSelected={appreciateData?.data.shade?.en}
          onSelect={(shade) => (shade ? setValue('shadeId', shade.id) : setValue('shadeId', ''))}
        />
        <HashtagSelect
          control={control}
          defaultSelected={appreciateData?.data.hashtag}
          onSelect={(hashtag) => (hashtag ? setValue('hashtag', hashtag.hashtag) : setValue('hashtag', ''))}
        />
        <Box borderRadius={5} boxShadow="0px 0px 8px -2px #00000040" p={1.5}>
          <Stack mt={1} alignItems="center" direction="row">
            <Typography>Add comment</Typography>
            <Typography fontSize={10} color="secondary">
              optional
            </Typography>
          </Stack>
          <ControlledTextArea
            fullWidth
            rows={6}
            multiline
            control={control}
            name="comment"
            onFocus={isFocused.setTrue}
            onBlur={isFocused.setFalse}
          />
        </Box>
        <Stack gap={2} direction="row">
          <Button
            onClick={handleSubmit((data) => {
              if (phoneNumber) {
                $appreciateWithMobile.mutate(data, {
                  onSuccess: () => {
                    navigate(paths.thankYou);
                  },
                  onError: (error) => {
                    console.error('Failed to send appreciation', error);
                  },
                });
                return;
              }

              $appreciateUser.mutate(data, {
                onSuccess: () => {
                  navigate(paths.thankYou);
                },
                onError: (error) => {
                  console.error('Failed to send appreciation', error);
                },
              });
            })}
            size="large"
            fullWidth
            variant="contained"
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AppreciatePage;
