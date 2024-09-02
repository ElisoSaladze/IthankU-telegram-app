import { Badge, Box, IconButton, SxProps, Theme, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate, To } from 'react-router-dom';
import ituIcon from 'src/assets/images/itu.svg';
import { paths } from '~/app/routes';
import { IconArrow, IconNotification } from '~/assets/icons';
import { useNotifications } from '~/lib/hooks';

type Props = {
  backPath?: To;
  pageName?: string;
  additionalContent?: ReactNode;
  headerSx?: SxProps<Theme>;
};

export const AppHeader = ({ backPath, pageName, additionalContent, headerSx }: Props) => {
  const navigate = useNavigate();

  const notifications = useNotifications();

  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        position: 'relative',
        bgcolor: 'white',
        ...headerSx,
      }}
    >
      {backPath ? (
        <IconButton
          onClick={() => {
            navigate(backPath);
          }}
        >
          <IconArrow direction="left" sx={{ fontSize: 18 }} />
        </IconButton>
      ) : (
        <Box
          component="img"
          src={ituIcon}
          alt="Logo"
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(paths.home);
          }}
        />
      )}

      {pageName && (
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            color: '#484848',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {pageName}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {additionalContent}
        <IconButton onClick={() => navigate(paths.pendingTransactions)}>
          <Badge
            color="error"
            badgeContent={notifications?.pendingTransactions}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <IconNotification sx={{ color: 'info.main' }} />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};
