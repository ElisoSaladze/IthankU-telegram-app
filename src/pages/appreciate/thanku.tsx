import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ty from '~/assets/images/ty.png'
import { paths } from '~/app/routes';

const ThankUPage = () => {
  const navigate = useNavigate();
  return (
    <Stack height="100vh" alignItems="center" justifyContent="space-evenly" overflow="hidden" gap={5} marginX={2}>
      <img width="100%" src={ty} />
      <Button color="info" variant="outlined" onClick={() => navigate(paths.home)}>
        Back to home
      </Button>
    </Stack>
  );
};

export default ThankUPage;
