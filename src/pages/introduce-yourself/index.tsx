import { Box, Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { ControlledTextArea } from 'src/components/form/controlled/controlled-text-area';
import { ControlledTextField } from 'src/components/form/controlled/controlled-text-field';
import PfpComponent from 'src/components/pfp-component';
import { checkUser, telegramSignUp, TelegramSignUpRequestBody, TTelegramSignUpRequestBody } from '~/api/auth';
import { qk } from '~/api/query-keys';
import { useAuth } from '~/app/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { paths } from '~/app/routes';
import { Progress } from '~/components/progress';

const IntroduceYourself = () => {
  const { authorize } = useAuth();
  const navigate = useNavigate();

  const { handleSubmit, setValue, control, watch } = useForm<TelegramSignUpRequestBody>({
    defaultValues: {
      telegramId: '',
      name: '',
      bio: '',
      interest: [],
      picture: '',
    },
    resolver: zodResolver(TTelegramSignUpRequestBody),
  });

  const picture = watch('picture');

  const { isLoading, isSuccess } = useQuery({
    queryKey: qk.users.check.toKey(),
    queryFn: checkUser,
    onSuccess: (data) => {
      authorize(data);
    },
  });

  const $telegramSignUp = useMutation({
    mutationFn: telegramSignUp,
  });

  return (
    <Stack height="100vh" alignItems="center" justifyContent="space-between" padding={2}>
      {isLoading || isSuccess ? (
        <Progress centered />
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit((values) => {
            $telegramSignUp.mutate(
              {
                ...values,
                interest: [],
              },
              {
                onSuccess: (data) => {
                  authorize(data);
                  navigate(paths.interests);
                },
              },
            );
          })}
        >
          <Button onClick={() => navigate(paths.interests)} sx={{ alignSelf: 'end' }} color="secondary">
            skip
          </Button>
          <Stack alignItems="center" width={1}>
            <Typography fontSize={24} fontWeight={600}>
              Introduce Yourself
            </Typography>
            <Typography textAlign="center">Share a bit about who you are and what you love.</Typography>
            <PfpComponent
              isEditable
              imageUrl={picture !== '' ? picture : undefined}
              onChange={(newImageUrl) => setValue('picture', URL.createObjectURL(newImageUrl))}
            />
          </Stack>
          <Stack width={1}>
            <Typography fontWeight={600} sx={{ alignSelf: 'start' }}>
              Username
            </Typography>
            <ControlledTextField fullWidth control={control} name="name" placeholder="Enter your userName" />
          </Stack>
          <Stack width={1}>
            <Typography fontWeight={600} sx={{ alignSelf: 'start' }}>
              About You
            </Typography>
            <ControlledTextArea
              fullWidth
              multiline
              rows={5}
              control={control}
              name="bio"
              placeholder="Tell others about yourself..."
            />
          </Stack>

          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            disabled={$telegramSignUp.isLoading}
          >
            Continue
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default IntroduceYourself;
