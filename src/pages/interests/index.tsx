import { Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { telegramSignUp } from '~/api/auth/auth.api';
import { paths } from 'src/app/routes';
import Loader from 'src/components/loader';
import ShadeComponent from 'src/components/shade-component';
import { useAuthContext } from 'src/providers/auth';
import { getShades } from '~/api/shades';

const InterestsPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, authorize } = useAuthContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'interest',
  });

  const [selectedShades, setSelectedShades] = useState<string[]>([]);

  const shades = useQuery({
    queryKey: ['shades'],
    queryFn: async () => getShades(),
  });

  const handleSelectShade = (shadeName: string) => {
    if (selectedShades.includes(shadeName)) {
      setSelectedShades((prev) => prev.filter((name) => name !== shadeName));
      const index = fields.findIndex((field) => field.value === shadeName);
      remove(index);
    } else {
      setSelectedShades((prev) => [...prev, shadeName]);
      append({ value: shadeName });
    }
  };

  const $telegramSignUp = useMutation({
    mutationFn: telegramSignUp,
  });

  const onSubmit = handleSubmit((data) => {
    $telegramSignUp.mutate(
      {
        ...data,
        interest: data.interest.map((tag) => tag.value),
      },
      {
        onSuccess: (data) => {
          authorize(data);
          navigate(paths.joinGroup);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  });

  return (
    <Stack spacing={2} height={'100vh'} alignItems={'center'} justifyContent={'space-between'} padding={2}>
      <Stack alignItems={'center'}>
        <Button onClick={onSubmit} sx={{ alignSelf: 'end' }} color="secondary">
          Skip
        </Button>
        <Typography fontSize={24} fontWeight={600}>
          Choose your interest
        </Typography>
        <Typography textAlign={'center'}>Choose the area that excites you the most.</Typography>
        {shades.isFetching ? (
          <Loader />
        ) : (
          <Stack gap={0.5} direction={'row'} flexWrap={'wrap'}>
            {shades.data?.data.map((shade) => (
              <ShadeComponent
                key={shade._id}
                selectable
                selected={selectedShades.includes(shade.en)}
                onSelect={() => handleSelectShade(shade.en)}
                color={shade.color}
                name={shade.en}
              />
            ))}
          </Stack>
        )}
      </Stack>

      <Button size="large" onClick={onSubmit} variant="contained" color="primary" fullWidth>
        Continue
      </Button>
    </Stack>
  );
};

export default InterestsPage;
