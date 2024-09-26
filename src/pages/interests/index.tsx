import { Button, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from 'src/components/loader';
import ShadeComponent from 'src/components/shade-component';
import { getShades } from '~/api/shades';
import { qk } from '~/api/query-keys';
import { paths } from '~/app/routes';
import { addUserInterests } from '~/api/users';
import { useAuthUser } from '~/app/auth';

type InterestsFormValues = {
  interests: Array<{ value: string }>;
};

const InterestsPage = () => {
  const authUser = useAuthUser();

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

  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const $shades = useQuery({
    queryKey: qk.shades.toKey(),
    queryFn: getShades,
  });

  const $addUserInterests = useMutation({
    mutationFn: addUserInterests,
  });

  const handleSelectShade = (shadeName: string) => {
    if (selectedAreas.includes(shadeName)) {
      setSelectedAreas((prev) => prev.filter((name) => name !== shadeName));
      const index = fields.findIndex((field) => field.value === shadeName);
      remove(index);
    } else {
      setSelectedAreas((prev) => [...prev, shadeName]);
      append({ value: shadeName });
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: 1,
        height: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
      }}
    >
      <Stack
        sx={{
          width: 1,
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            navigate(paths.joinSpace);
          }}
          sx={{ alignSelf: 'end' }}
          color="secondary"
        >
          Skip
        </Button>

        <Typography fontSize={32} fontWeight={600}>
          Choose your interest
        </Typography>

        <Typography fontSize={16} color="secondary.dark" textAlign="center" my={2} mb={3}>
          Choose the area that excites you the most.
        </Typography>

        {$shades.isFetching ? (
          <Loader />
        ) : (
          <Stack gap={1} columnGap={2} direction={'row'} flexWrap={'wrap'}>
            {$shades.data?.data.map((shade) => (
              <ShadeComponent
                key={shade.id}
                selectable
                selected={selectedAreas.includes(shade.en)}
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
          if (authUser) {
            $addUserInterests.mutate(
              {
                userId: authUser.user.id,
                interests: selectedAreas,
              },
              {
                onSuccess: () => {
                  navigate(paths.joinSpace);
                },
              },
            );
          }
        }}
        variant="contained"
        color="primary"
        fullWidth
        disabled={$addUserInterests.isLoading}
      >
        Continue
      </Button>
    </Stack>
  );
};

export default InterestsPage;
