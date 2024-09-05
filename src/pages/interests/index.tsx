import { Button, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from 'src/components/loader';
import ShadeComponent from 'src/components/shade-component';
import { getShades } from '~/api/shades';
import { qk } from '~/api/query-keys';
import { paths } from '~/app/routes';

type InterestsFormValues = {
  interests: Array<{ value: string }>;
};

const InterestsPage = () => {
  const navigate = useNavigate();

  const { control } = useForm<InterestsFormValues>({
    defaultValues: {
      interests: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'interests',
  });

  const [selectedShades, setSelectedShades] = useState<string[]>([]);

  const shades = useQuery({
    queryKey: qk.shades.toKey(),
    queryFn: getShades,
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

  return (
    <Stack spacing={2} height="100vh" alignItems="center" justifyContent="space-between" padding={2}>
      <Stack alignItems={'center'}>
        <Button
          onClick={() => {
            navigate(paths.joinGroup);
          }}
          sx={{ alignSelf: 'end' }}
          color="secondary"
        >
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
                key={shade.id}
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

      <Button
        size="large"
        onClick={() => {
          // TODO add update interests logic
          navigate(paths.joinGroup);
        }}
        variant="contained"
        color="primary"
        fullWidth
      >
        Continue
      </Button>
    </Stack>
  );
};

export default InterestsPage;
