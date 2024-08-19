import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const GroupSettings = () => {
    const navigate = useNavigate();
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>Group Settings</Typography>
      <List>
        <ListItem button onClick={() => navigate('/groups/followings')}>
          <ListItemText primary="Following" />
          <IconButton edge="end">
            <ArrowForwardIos />
          </IconButton>
        </ListItem>
        <ListItem button onClick={() => navigate('/groups/invitations')}>
          <ListItemText primary="Invitation" />
          <IconButton edge="end">
            <ArrowForwardIos />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default GroupSettings;
