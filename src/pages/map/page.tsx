import { isMacOs } from 'react-device-detect';
import { MapPageContent } from './components';
import { Box, Stack, Typography } from '@mui/material';

export const MapPage = () => {
  return (
    <Stack height={1} overflow="hidden">
      {isMacOs ? (
        <Box
          sx={{
            width: 1,
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography textAlign="center" color="text.secondary" mt={3}>
            Map cannot be accessed on MacOS
          </Typography>
        </Box>
      ) : (
        <MapPageContent />
      )}
    </Stack>
  );
};
