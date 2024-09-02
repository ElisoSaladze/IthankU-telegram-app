/* eslint-disable @typescript-eslint/no-explicit-any */
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { qk } from 'src/api/query-keys';
import { getShades, Shade } from 'src/api/shades';
import { ControlledTextField } from 'src/components/form/controlled/controlled-text-field';
import Loader from 'src/components/loader';
import ShadeComponent from 'src/components/shade-component';
import TagItem from 'src/components/tag';
import { useCreateGroupContext } from 'src/providers/create-group-provider';

export const NewGroupInterests = () => {
  const { control, watch, setValue } = useCreateGroupContext();
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
    if (selectedShade === shade.en) {
      setSelectedShade('');
      setValue('shade', '');
      setValue('shadeColor', '');
    } else {
      setSelectedShade(shade.en);
      setValue('shade', shade.en);
      setValue('shadeColor', shade.color);
    }
  };

  return (
    <Stack gap={1} width={1} mt={10}>
      <Typography fontSize={16} color="text.secondary" fontWeight={500} mb={0.5}>
        Shade
      </Typography>
      {shades.isFetching ? (
        <Loader />
      ) : (
        <Stack gap={0.5} direction="row" flexWrap="wrap">
          {shades.data?.data.map((shade: any) => (
            <ShadeComponent
              key={shade._id}
              selectable
              selected={selectedShade === shade.en}
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
      <ControlledTextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  append({ value: watch('currentTag') });
                  setValue('currentTag', '#');
                }}
                edge="end"
              >
                <DoneIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        name="currentTag"
        control={control}
      />
      <Stack spacing={0.5} direction={'row'} flexWrap={'wrap'}>
        {fields.map((tag, index) => (
          <TagItem key={tag.id} clickable onClick={() => remove(index)} tag={tag.value} />
        ))}
      </Stack>
    </Stack>
  );
};
