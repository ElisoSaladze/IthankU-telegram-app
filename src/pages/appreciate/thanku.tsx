import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/app/routes';
import ty from 'src/assets/images/ty.png';

const ThankUPage = () => {
  const navigate = useNavigate();
  return (
    <Stack height="100vh" alignItems="center" justifyContent="space-evenly" overflow="hidden" gap={5} mx={2}>
      <img width="100%" src={ty} />
      <Button color="info" variant="outlined" onClick={() => navigate(paths.home)}>
        Back to home
      </Button>
    </Stack>
  );
};

export default ThankUPage;
