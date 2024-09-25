import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const FilterItem = ({ text }: { text: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isActive = searchParams.get('notification-type') === text;

  return (
    <Box
      sx={{
        px: 1,
        border: 1,
        borderColor: 'primary.main',
        bgcolor: isActive ? 'primary.main' : 'white',
        borderRadius: 6,
        cursor: 'pointer',
      }}
      onClick={() => {
        if (isActive) {
          searchParams.delete('notification-type');
        }
        searchParams.set('notification-type', text);

        setSearchParams(searchParams);
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: isActive ? 'white' : 'primary.main',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export const NotificationsFilter = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2,
      }}
    >
      <FilterItem text="general" />
      <FilterItem text="invitations" />
      <FilterItem text="posts" />
      <FilterItem text="transactions" />
    </Box>
  );
};
