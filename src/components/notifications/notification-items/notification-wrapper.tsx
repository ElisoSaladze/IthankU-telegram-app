import { Avatar, Box } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  avatar?: string | null;
  isRead: boolean;
  children: ReactNode;
};

export const NotificationWrapper = ({ avatar, isRead, children }: Props) => {
  return (
    <Box
      sx={{
        width: 1,
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'stretch',
        gap: 2,
        bgcolor: isRead ? 'transparent' : 'primary.50',
      }}
    >
      {avatar && <Avatar src={avatar} alt="user" sx={{ width: 70, height: 70 }} />}

      <Box
        sx={{
          width: 1,
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
