import { Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { ControlledTextArea } from 'src/components/form/controlled/controlled-text-area';
import { ControlledTextField } from 'src/components/form/controlled/controlled-text-field';
import PfpComponent from 'src/components/pfp-component';
import { telegramSignUp, TelegramSignUpRequestBody, TTelegramSignUpRequestBody } from '~/api/auth';
import { useAuth } from '~/app/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { paths } from '~/app/routes';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';

const IntroduceYourself = () => {
  const navigate = useNavigate();

  const { authorize } = useAuth();

  const { initData } = retrieveLaunchParams();

  const isKeyboardOpen = useDetectKeyboardOpen();

  const { handleSubmit, setValue, control, watch } = useForm<TelegramSignUpRequestBody>({
    defaultValues: {
      telegramId: initData!.user!.id,
      name: initData?.user ? `${initData.user.firstName} ${initData.user.lastName}` : '',
      bio: '',
      interest: [],
      picture: '',
    },
    resolver: zodResolver(TTelegramSignUpRequestBody),
  });

  const picture = watch('picture');

  const $telegramSignUp = useMutation({
    mutationFn: telegramSignUp,
  });

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit((values) => {
        $telegramSignUp.mutate(
          {
            ...values,
            interest: [],
          },
          {
            onSuccess: (data) => {
              authorize(data.data);
              navigate(paths.interests);
            },
          },
        );
      })}
      sx={{
        height: `calc(100% + ${isKeyboardOpen ? 150 : 0}px)`,
        alignItems: 'center',
        p: 3,
        position: 'relative',
      }}
    >
      <Button
        type="submit"
        variant="text"
        sx={{
          position: 'absolute',
          top: 20,
          right: 15,
        }}
        disabled={$telegramSignUp.isLoading}
      >
        Continue
      </Button>

      <Typography fontSize={24} fontWeight={600} textAlign="center" mt={5}>
        Introduce Yourself
      </Typography>
      <Typography fontSize={16} color="secondary.dark" textAlign="center" my={2}>
        Share a bit about who you are and what you love.
      </Typography>

      <PfpComponent
        isEditable
        imageUrl={picture !== '' ? picture : undefined}
        onChange={(newImageUrl) => setValue('picture', URL.createObjectURL(newImageUrl))}
      />

      <Typography sx={{ fontSize: 16, fontWeight: 600, alignSelf: 'start', mt: 2, mb: 0.5, ml: 1 }}>
        Username
      </Typography>

      <ControlledTextField
        fullWidth
        control={control}
        name="name"
        placeholder="Enter your userName"
        InputProps={{
          sx: { borderRadius: 8 },
        }}
      />

      <Typography sx={{ fontSize: 16, fontWeight: 600, alignSelf: 'start', mt: 2, mb: 0.5, ml: 1 }}>
        About You
      </Typography>

      <ControlledTextArea
        fullWidth
        multiline
        rows={5}
        control={control}
        name="bio"
        placeholder="Tell others about yourself..."
        InputProps={{
          sx: { borderRadius: 8 },
        }}
      />
    </Stack>
  );
};

export default IntroduceYourself;
