import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ty from '~/assets/images/ty.png';
import { paths } from '~/app/routes';

export const ThankUPage = () => {
  const navigate = useNavigate();
  return (
    <Stack height={1} alignItems="center" justifyContent="space-evenly" overflow="hidden" gap={5} mx={5}>
      <Box component="img" width={1} src={ty} />
      <Button
        variant="contained"
        onClick={() => {
          navigate(paths.home);
        }}
        size="large"
        fullWidth
      >
        Back to home
      </Button>
    </Stack>
  );
};
