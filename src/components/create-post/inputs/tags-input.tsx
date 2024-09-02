import DoneIcon from '@mui/icons-material/Done';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { Control, useFieldArray, UseFormSetValue } from 'react-hook-form';
import { ControlledTextField } from '~/components/form/controlled/controlled-text-field';
import TagItem from '~/components/tag';
import { CreatePostFormValues } from '../create-post-form';

type Props = {
  control: Control<CreatePostFormValues>;
  setValue: UseFormSetValue<CreatePostFormValues>;
  currentTag: string;
};

export const TagsInput = ({ control, setValue, currentTag }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  return (
    <>
      <Stack
        sx={{
          border: '1px solid #ccc',
          borderRadius: 4,
          paddingTop: 1,
        }}
      >
        <Typography marginLeft={1.5} color={'primary.light'} fontSize={'small'}>
          Tags
        </Typography>
        <ControlledTextField
          name="currentTag"
          control={control}
          InputProps={{
            sx: {
              padding: 0,
              paddingRight: 1.5,
              '& fieldset': {
                border: 'none', // Remove the border
              },
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    append({ value: currentTag });
                    setValue('currentTag', '#');
                  }}
                  edge="end"
                >
                  <DoneIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack spacing={0.5} direction={'row'} flexWrap={'wrap'}>
        {fields.map((tag, index) => (
          <TagItem key={tag.id} clickable onClick={() => remove(index)} tag={tag.value} />
        ))}
      </Stack>
    </>
  );
};
