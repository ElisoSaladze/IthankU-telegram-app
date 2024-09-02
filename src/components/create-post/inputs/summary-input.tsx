import { Box, FormHelperText, Stack, Typography } from '@mui/material';
import { Control, FieldError } from 'react-hook-form';
import { ControlledTextField } from '~/components/form/controlled/controlled-text-field';
import { CreatePostFormValues } from '../create-post-form';

type Props = {
  control: Control<CreatePostFormValues>;
  error?: FieldError;
};

export const SummaryInput = ({ control, error }: Props) => {
  return (
    <Box>
      <Stack
        sx={{
          border: 1,
          borderColor: error ? 'error.main' : '#ccc',
          borderRadius: 4,
          paddingTop: 1,
        }}
      >
        <Typography ml={1.5} color="primary.light" fontSize="small">
          Summary
        </Typography>
        <ControlledTextField
          required
          name="summary"
          control={control}
          rows={1}
          disableError
          InputProps={{
            sx: {
              padding: 0,
              '& fieldset': {
                border: 'none', // Remove the border
              },
              fontWeight: 600,
            },
          }}
        />
      </Stack>

      {error && <FormHelperText sx={{ color: 'error.main', ml: 0.5 }}>{error.message}</FormHelperText>}
    </Box>
  );
};
