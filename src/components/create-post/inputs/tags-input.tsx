import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Control, useFieldArray, UseFormSetValue } from 'react-hook-form';
import TagItem from '~/components/tag';
import { CreatePostFormValues } from '../create-post-form';
import { useState } from 'react';
import { IconCheck } from '~/assets/icons';

type Props = {
  control: Control<CreatePostFormValues>;
  setValue: UseFormSetValue<CreatePostFormValues>;
};

export const TagsInput = ({ control }: Props) => {
  const [newTag, setNewTag] = useState('#');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            border: 1,
            borderColor: '#ccc',
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            paddingTop: 1,
            width: 1,
            borderRight: 0,
          }}
        >
          <Typography marginLeft={1.5} color={'primary.light'} fontSize={'small'}>
            Tags
          </Typography>
          <TextField
            value={newTag}
            onChange={(event) => {
              setNewTag(event.target.value);
            }}
            InputProps={{
              sx: {
                padding: 0,
                paddingRight: 1.5,
                '& fieldset': {
                  border: 'none', // Remove the border
                },
              },
            }}
          />
        </Stack>
        <Box
          sx={{
            border: 1,
            borderColor: '#ccc',
            height: 1,
            display: 'flex',
            alignItems: 'center',
            pr: 1,
            borderLeft: 0,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <IconButton
            onClick={() => {
              if (newTag && newTag !== '#') {
                append({ value: newTag });
                setNewTag('#');
              }
            }}
          >
            <IconCheck />
          </IconButton>
        </Box>
      </Box>
      <Stack spacing={0.5} direction="row" flexWrap="wrap" mb={2}>
        {fields.map((tag, index) => (
          <TagItem key={tag.id} clickable onClick={() => remove(index)} tag={tag.value} />
        ))}
      </Stack>
    </>
  );
};
