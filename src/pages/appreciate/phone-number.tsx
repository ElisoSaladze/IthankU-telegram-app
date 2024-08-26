import { Button, Stack, Typography } from '@mui/material';
import BackButtonAppBar from 'src/components/appbar';
import appreciate from 'src/assets/images/like.png';
import { ControlledPhoneInput } from 'src/components/form/controlled/controlled-phone-input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const PhoneNumberAppreciate = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phoneNumber: '',
    },
  });

  const validatePhoneNumber = (value: string) => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(value);
      return phoneUtil.isValidNumber(number) || 'Please enter a valid phone number';
    } catch {
      return 'Invalid phone number format';
    }
  };

  return (
    <Stack
      height={'100vh'}
      gap={2}
      paddingY={5}
      paddingTop={8}
      justifyContent={'space-between'}
      alignItems={'center'}
      marginX={2}
    >
      <BackButtonAppBar pageName="" />
      <Stack gap={2} alignItems={'center'} width={'100%'}>
        <img width={85} src={appreciate} />
        <Typography fontSize={30}>Appreciate</Typography>
        <Typography>Please enter phone number to appreciate</Typography>
        <ControlledPhoneInput
          rules={{
            required: 'Phone number is required',
            validate: validatePhoneNumber,
          }}
          defaultCountry="ge"
          fullWidth
          control={control}
          name="phoneNumber"
        />
      </Stack>
      <Button
        onClick={handleSubmit((data) =>
          navigate(`/appreciate/${data.phoneNumber}`, {
            state: {
              phoneNumber: true,
            },
          }),
        )}
        size="large"
        fullWidth
        variant="contained"
        color="primary"
      >
        Continue
      </Button>
    </Stack>
  );
};

export default PhoneNumberAppreciate;
