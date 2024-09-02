import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { IconNotification } from 'src/assets/icons';

type Props = {
  pageName: string;
  color?: string;
  showNotif?: boolean;
};

const BackButtonAppBar = ({ pageName, color = 'white', showNotif = true }: Props) => {
  const navigate = useNavigate();
  return (
    <AppBar
      sx={{
        bgcolor: color,
        border: 3,
      }}
    >
      <Toolbar sx={{ px: 0 }}>
        <ArrowBackIosIcon onClick={() => navigate(-1)} sx={{ color: 'secondary.dark' }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              fontWeight: 500,
              textAlign: 'center',
              color: 'black',
              fontSize: 20,
            }}
          >
            {pageName}
          </Typography>
        </Box>
        {showNotif && (
          <IconButton>
            <IconNotification sx={{ color: 'info.main' }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default BackButtonAppBar;
