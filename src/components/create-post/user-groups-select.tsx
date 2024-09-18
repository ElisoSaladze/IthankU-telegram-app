import { Control, FieldError } from 'react-hook-form';
import { CreatePostFormValues } from './create-post-form';
import { ControlledSelect } from '../form/controlled/controlled-select';
import { useQuery } from '@tanstack/react-query';
import { getUserGroups } from '~/api/groups';
import { qk } from '~/api/query-keys';
import { useAuthUser } from '~/app/auth';
import { match, P } from 'ts-pattern';
import { Box, FormHelperText, Skeleton, Typography } from '@mui/material';
import { ErrorView } from '../error-view';

type Props = {
  control: Control<CreatePostFormValues>;
  error?: FieldError;
};

export const UserGroupsSelect = ({ control, error }: Props) => {
  const authUser = useAuthUser();

  const $userGroups = useQuery({
    queryKey: qk.groups.getUserGroups.toKeyWithArgs({ userId: authUser?.user.id ?? '' }),
    queryFn: () => getUserGroups({ userId: authUser?.user.id ?? '' }),
    enabled: authUser !== null,
  });

  return (
    <Box>
      <Box sx={{ width: 1, position: 'relative' }}>
        {match($userGroups)
          .with({ isLoading: true }, () => <Skeleton variant="rounded" sx={{ width: 1, height: 40 }} />)
          .with({ error: true }, () => <ErrorView message="Failed to get user groups" />)
          .with({ isSuccess: true, data: P.select() }, ({ data: groups }) => {
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
                  Group
                </Typography>
                <ControlledSelect
                  control={control}
                  name="groupId"
                  options={groups.map((group) => ({ label: group.name, value: group.id }))}
                  fullWidth
                  placeholder="Choose group"
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
