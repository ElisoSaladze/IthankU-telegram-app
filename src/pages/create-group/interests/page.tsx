/* eslint-disable @typescript-eslint/no-explicit-any */
import DoneIcon from '@mui/icons-material/Done';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { qk } from 'src/api/query-keys';
import { getShades, Shade } from 'src/api/shades';
import Loader from 'src/components/loader';
import ShadeComponent from 'src/components/shade-component';
import TagItem from 'src/components/tag';
import { useCreateGroupContext } from 'src/providers/create-group-provider';
import { paths } from '~/app/routes';

export const NewGroupInterests = () => {
  const navigate = useNavigate();

  const [newTag, setNewTag] = useState('#');
  const { control, setValue, handleSubmit } = useCreateGroupContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const [selectedShade, setSelectedShade] = useState('');

  const shades = useQuery({
    queryKey: qk.shades.toKey(),
    queryFn: getShades,
  });

  const handleSelectShade = (shade: Shade) => {
    if (selectedShade === shade.id) {
      setSelectedShade('');
      setValue('shade', undefined);
    } else {
      setSelectedShade(shade.id);
      setValue('shade', shade);
    }
  };

  return (
    <Stack gap={1} width={1} mt={10} height={1} position="relative">
      <Typography fontSize={16} color="text.secondary" fontWeight={500} mb={0.5}>
        Shade
      </Typography>
      {shades.isFetching ? (
        <Box position="relative" width={1} height={100}>
          <Loader />
        </Box>
      ) : (
        <Stack gap={0.5} direction="row" flexWrap="wrap">
          {shades.data?.data.map((shade: any) => (
            <ShadeComponent
              key={shade.id}
              selectable
              selected={selectedShade === shade.id}
              onSelect={() => handleSelectShade(shade)}
              color={shade.color}
              name={shade.en}
            />
          ))}
        </Stack>
      )}

      <Typography fontSize={16} color="text.secondary" fontWeight={500} mt={3} mb={0.5}>
        Tags
      </Typography>
      <TextField
        onChange={(event) => {
          setNewTag(event.target.value);
        }}
        value={newTag}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (newTag && newTag !== '#') {
                    append({ value: newTag });
                    setNewTag('#');
                  }
                }}
                edge="end"
              >
                <DoneIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Stack spacing={0.5} direction={'row'} flexWrap={'wrap'}>
        {fields.map((tag, index) => (
          <TagItem key={tag.id} clickable onClick={() => remove(index)} tag={tag.value} />
        ))}
      </Stack>

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          mt: 3,
          position: 'absolute',
          bottom: 10,
        }}
        onClick={handleSubmit(() => {
          navigate(paths.createGroupFinal);
        })}
      >
        Next
      </Button>
    </Stack>
  );
};
