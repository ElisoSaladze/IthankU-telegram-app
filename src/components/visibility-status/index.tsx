/* eslint-disable @typescript-eslint/no-explicit-any */
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Stack, Typography } from '@mui/material';

import { Control } from 'react-hook-form';
import { ControlledRadioGroup } from 'src/components/form/controlled/controlled-radio-group';
import { PostType, Visibility } from '~/constants/enums';

type Props = {
  control: Control<any, any>;
  name: string;
  labels: [string, string];
  isGroupVisibility?: boolean;
};

const VisibilityStatus = ({ control, name, labels, isGroupVisibility }: Props) => {
  return (
    <Box width={1}>
      <ControlledRadioGroup
        fullWidth
        name={name}
        control={control}
        options={[
          {
            label: (
              <Box display="flex" gap={2} alignItems="center">
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2.5,
                    bgcolor: 'secondary.main',
                  }}
                >
                  <PublicIcon />
                </Box>
                <Stack>
                  <Typography fontWeight={600}>{isGroupVisibility ? 'Public' : 'Free'}</Typography>
                  <Typography fontSize="small">{labels[0]}</Typography>
                </Stack>
              </Box>
            ),
            value: isGroupVisibility ? Visibility.Public : PostType.Free,
          },
          {
            label: (
              <Box display="flex" gap={2} alignItems="center" mt={1}>
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2.5,
                    bgcolor: 'secondary.main',
                  }}
                >
                  <LockIcon />
                </Box>
                <Stack>
                  <Typography fontWeight={600}>{isGroupVisibility ? 'Private' : 'Paid'}</Typography>
                  <Typography fontSize="small">{labels[1]}</Typography>
                </Stack>
              </Box>
            ),
            value: isGroupVisibility ? Visibility.Private : PostType.Paid,
          },
        ]}
      />
    </Box>
  );
};

export default VisibilityStatus;
