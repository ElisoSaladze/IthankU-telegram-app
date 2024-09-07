import { Button, Dialog, Stack, Typography } from '@mui/material';
import appreciate from 'src/assets/images/like.png';
import { ControlledPhoneInput } from 'src/components/form/controlled/controlled-phone-input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const PhoneNumberAppreciate = ({ isOpen, onClose }: Props) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;
  if (isOpen) {
    app.BackButton.show();
    app.BackButton.onClick(onClose);
  } else {
    app.BackButton.hide();
  }
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <Stack height={1} gap={2} justifyContent="space-between" alignItems="center" m={3}>
        <Stack gap={2} alignItems="center" width="100%">
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
    </Dialog>
  );
};
