import { Box, Button, FormHelperText, IconButton, Stack, Typography } from '@mui/material';
import { ControlledTextArea } from '~/components/form/controlled/controlled-text-area';
import { CreatePostFormValues } from '../create-post-form';
import { Control, FieldError, useFieldArray } from 'react-hook-form';
import { IconAttach, IconClose, IconPhoto } from '~/assets/icons';
import { useState } from 'react';
import PreviewImg from '~/components/preview-img';

const MAX_LENGTH = 300;

type Props = {
  contentLength: number;
  control: Control<CreatePostFormValues>;
  error?: FieldError;
};

export const PostTextInput = ({ contentLength, control, error: inputError }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const maxFileSize = 25 * 1024 * 1024;

  const {
    fields: imgFields,
    append: imgAppend,
    remove: imgRemove,
  } = useFieldArray({
    control,
    name: 'media',
  });

  const {
    fields: fileFields,
    append: fileAppend,
    remove: fileRemove,
  } = useFieldArray({
    control,
    name: 'attachments',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isImage: boolean) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      if (file.size > maxFileSize) {
        setError('File size should not exceed 25MB.');
      } else {
        if (isImage) {
          fileRemove(0); // Remove any existing file
          imgRemove(0); // Remove any existing image/video
          imgAppend({ value: file }); // Append new image/video
        } else {
          imgRemove(0); // Remove any existing image/video
          fileRemove(0); // Remove any existing file
          fileAppend({ value: file }); // Append new file
        }
        setError(null); // Clear any previous errors
      }
    }
  };

  return (
    <Box>
      <Stack
        sx={{
          border: '1px solid #ccc',
          borderColor: inputError ? 'error.main' : '#ccc',
          borderRadius: 7,
          padding: 2,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography color="primary.light" fontSize="small">
            Text
          </Typography>
          <Typography color="error.main" fontSize={14} fontWeight={500}>
            {MAX_LENGTH - contentLength}
          </Typography>
        </Stack>
        <ControlledTextArea
          required
          name="content"
          control={control}
          rows={5}
          maxLength={MAX_LENGTH}
          disableError
          InputProps={{
            sx: {
              fontWeight: 500,
              padding: 0,
              '& fieldset': {
                border: 'none', // Remove the border
              },
            },
          }}
          multiline
        />
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" component="label">
            <Box
              component="input"
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={(event) => handleFileChange(event, true)}
            />
            <IconPhoto sx={{ fontSize: 14, mr: 0.5 }} />
            Photo/Video
          </Button>
          <Button variant="outlined" component="label">
            <Box
              component="input"
              type="file"
              accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              hidden
              onChange={(event) => handleFileChange(event, false)}
            />
            <IconAttach sx={{ fontSize: 14, mr: 0.5 }} />
            Attachment
          </Button>
        </Stack>
      </Stack>
      {inputError && <FormHelperText sx={{ color: 'error.main', ml: 0.5 }}>{inputError.message}</FormHelperText>}
      {error && <FormHelperText sx={{ color: 'error.main', ml: 0.5 }}>{error}</FormHelperText>}

      {fileFields.length > 0 && (
        <Stack direction="row" alignItems="center" spacing={1} ml={1} mt={1}>
          <IconAttach sx={{ fontSize: 18 }} />
          <Typography
            onClick={() => {
              const fileURL = URL.createObjectURL(fileFields[0]!.value);
              window.open(fileURL, '_blank');
            }}
            sx={{
              cursor: 'pointer',
            }}
          >
            {fileFields[0]!.value.name}
          </Typography>
          <IconButton onClick={() => fileRemove(0)}>
            <IconClose sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>
      )}

      <Stack spacing={0.5} direction="row" mt={2}>
        {imgFields.length > 0 && <PreviewImg remove={() => imgRemove(0)} image={imgFields[0]!.value} />}
      </Stack>
    </Box>
  );
};
