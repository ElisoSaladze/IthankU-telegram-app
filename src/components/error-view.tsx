import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paths } from '~/app/routes';

type Props = {
  message: string;
  description?: string;
};

export const ErrorView = ({ message, description }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 3,
        px: 3,
      }}
    >
      <Box
        sx={{
          width: 1,
          bgcolor: 'white',
          border: 1,
          borderColor: 'divider',
          borderRadius: 4,
          p: 2,
        }}
      >
        <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 600, mt: 1, overflowWrap: 'break-word' }}>
          {message}
        </Typography>

        {description && (
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: 'text.secondary', mt: 1, overflowWrap: 'break-word' }}
          >
            {description}
          </Typography>
        )}

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 3, mb: 1 }}
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh this page
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            navigate(paths.home);
          }}
        >
          Go to home page
        </Button>
      </Box>
    </Box>
  );
};
