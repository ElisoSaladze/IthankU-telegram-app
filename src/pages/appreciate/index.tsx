import { Box, Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';
import { Params, useLocation, useNavigate, useParams } from 'react-router-dom';
import BackButtonAppBar from 'src/components/appbar';
import AreaSelect from 'src/components/appreciate-components/select-area';
import HashtagSelect from 'src/components/appreciate-components/select-hashtag';
import { ControlledTextArea } from 'src/components/form/controlled/controlled-text-area';
import { appreciateUser, AppreciateUserInput, appreciateWithMobile, getAppreciateUser } from '~/api/appreciate';
import { qk } from '~/api/query-keys';
import { paths } from '~/app/routes';

const AppreciatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { postAuthor, phoneNumber } = location.state || {};

  const { appreciateId } = useParams<Params>(); // TODO! ERROR It is not real appreciateId it is postId!!

  const { control, setValue, handleSubmit } = useForm<AppreciateUserInput>({
    defaultValues: {
      _id: postAuthor,
      postId: !phoneNumber && String(postAuthor).length > 0 ? appreciateId : undefined,
      mobileNumber: phoneNumber ? appreciateId : undefined,
    },
  });

  const { data: appreciateData } = useQuery({
    queryKey: qk.appreciate.getUser.toKeyWithArgs({ appreciateId: appreciateId! }),
    queryFn: () => getAppreciateUser({ appreciateId: appreciateId! }),
    enabled: !!appreciateId && !phoneNumber,
    onSuccess: (data) => {
      if (data?.data.area) setValue('shade', data.data.area);
      if (data?.data.hashtag) setValue('hashtag', data.data.hashtag);
      setValue('_id', data.data.code);
    },
  });

  const $appreciateUser = useMutation({
    mutationFn: appreciateUser,
  });

  const $appreciateWithMobile = useMutation({
    mutationFn: appreciateWithMobile,
  });

  return (
    <Stack mx={2}>
      <BackButtonAppBar pageName="" />
      <Stack marginTop={2} gap={2}>
        <AreaSelect
          defaultSelected={appreciateData?.data.area}
          onSelect={(shade) => (shade ? setValue('shade', shade.en) : setValue('shade', ''))}
        />
        <HashtagSelect
          defaultSelected={appreciateData?.data.hashtag}
          onSelect={(hashtag) => (hashtag ? setValue('hashtag', hashtag.hashtag) : setValue('hashtag', ''))}
        />
        <Box borderRadius={5} boxShadow={'0px 0px 8px -2px #00000040'} p={1.5}>
          <Stack marginBottom={1} alignItems={'center'} direction={'row'}>
            <Typography>Add comment</Typography>
            <Typography fontSize={10} color={'secondary'}>
              optional
            </Typography>
          </Stack>
          <ControlledTextArea fullWidth rows={6} multiline control={control} name="comment" />
        </Box>
        <Stack gap={2} direction={'row'}>
          <Button size="large" fullWidth variant="contained" color="secondary">
            Skip
          </Button>
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
    </Stack>
  );
};

export default AppreciatePage;
