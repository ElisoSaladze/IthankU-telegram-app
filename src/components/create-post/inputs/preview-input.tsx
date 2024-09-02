import { Stack, Typography } from '@mui/material';
import { ControlledTextArea } from '~/components/form/controlled/controlled-text-area';
import { CreatePostFormValues } from '../create-post-form';
import { Control } from 'react-hook-form';

type Props = {
  control: Control<CreatePostFormValues>;
};

export const PreviewInput = ({ control }: Props) => {
  return (
    <Stack
      sx={{
        border: '1px solid #ccc',
        borderRadius: 5,
        padding: 2,
      }}
    >
      <Typography color={'primary.light'} fontSize={'small'}>
        Preview Text
      </Typography>
      <ControlledTextArea
        multiline
        rows={2}
        name="preview"
        control={control}
        InputProps={{
          sx: {
            padding: 0,
            '& fieldset': {
              border: 'none', // Remove the border
            },
          },
        }}
      />
    </Stack>
  );
};
