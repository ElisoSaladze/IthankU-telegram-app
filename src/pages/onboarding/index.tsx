import { Avatar, Button, Stack, Typography } from '@mui/material';
import itu from 'src/assets/images/itu2.png';
import { useNavigate } from 'react-router-dom';
import { paths } from '~/app/routes';
import { useQuery } from '@tanstack/react-query';
import { qk } from '~/api/query-keys';
import { checkUser } from '~/api/auth';
import { useAuth } from '~/app/auth';
import { Progress } from '~/components/progress';

const Onboarding = () => {
  const navigate = useNavigate();
  const { authorize } = useAuth();

  const { isLoading, isSuccess } = useQuery({
    queryKey: qk.users.check.toKey(),
    queryFn: checkUser,
    onSuccess: (data) => {
      navigate(paths.home);
      authorize(data.data);
    },
  });

  return (
    <Stack height="100vh" overflow="hidden" alignItems="center" justifyContent="space-between" p={2}>
      {isLoading || isSuccess ? (
        <Progress centered />
      ) : (
        <>
          <Stack alignItems="center" textAlign="center">
            <Avatar sx={{ width: 150, height: 150 }} src={itu} />
            <Typography fontSize="large" fontWeight={600}>
              Welcome to ITU Platform
            </Typography>
            <Typography fontSize="small">
              Encouraging small acts of kindness that colectivelly create a big,positive impact on individuals and
              communities
            </Typography>
          </Stack>
          <Button onClick={() => navigate(paths.introduceYourself)} fullWidth size="large" variant="contained">
            Get Started
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Onboarding;
