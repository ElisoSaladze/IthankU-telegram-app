import { Control, FieldError } from 'react-hook-form';
import { CreatePostFormValues } from './create-post-form';
import { ControlledSelect } from '../form/controlled/controlled-select';
import { useQuery } from '@tanstack/react-query';
import { getUserSpaces } from '~/api/spaces';
import { qk } from '~/api/query-keys';
import { useAuthUser } from '~/app/auth';
import { match, P } from 'ts-pattern';
import { Box, FormHelperText, Skeleton, Typography } from '@mui/material';
import { ErrorView } from '../error-view';

type Props = {
  control: Control<CreatePostFormValues>;
  error?: FieldError;
};

export const UserSpacesSelect = ({ control, error }: Props) => {
  const authUser = useAuthUser();

  const $userSpaces = useQuery({
    queryKey: qk.spaces.getUserSpaces.toKeyWithArgs({ userId: authUser?.user.id ?? '' }),
    queryFn: () => getUserSpaces({ userId: authUser?.user.id ?? '' }),
    enabled: authUser !== null,
  });

  return (
    <Box>
      <Box sx={{ width: 1, position: 'relative' }}>
        {match($userSpaces)
          .with({ isLoading: true }, () => <Skeleton variant="rounded" sx={{ width: 1, height: 40 }} />)
          .with({ error: true }, () => <ErrorView message="Failed to get user spaces" />)
          .with({ isSuccess: true, data: P.select() }, ({ data: spaces }) => {
            return (
              <Box
                sx={{
                  border: 1,
                  borderColor: error ? 'error.main' : '#ccc',
                  borderRadius: 4,
                  pb: 2,
                }}
              >
                <Typography ml={1.5} mt={1} color="primary.light" fontSize="small">
                  Space
                </Typography>
                <ControlledSelect
                  control={control}
                  name="spaceId"
                  options={spaces.map((space) => ({ label: space.name, value: space.id }))}
                  fullWidth
                  placeholder="Choose space"
                  required
                  disableError
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
              </Box>
            );
          })
          .run()}
      </Box>

      {error && <FormHelperText sx={{ color: 'error.main', ml: 0.5 }}>{error.message}</FormHelperText>}
    </Box>
  );
};
