import React from 'react';
import { Box, Typography, Avatar, Button, Chip } from '@mui/material';
import { Group } from 'src/api/group/types';

type InvitationItemProps = {
  group: Group;
  onAccept: (groupId: string) => void;
  onDecline: (groupId: string) => void;
};

const InvitationItem: React.FC<InvitationItemProps> = ({ group, onAccept, onDecline }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      borderRadius="16px"
      boxShadow={2}
      bgcolor="#fff"
      style={{ marginBottom: '16px', maxWidth: '500px' }}
    >
      <Box display="flex" alignItems="center">
        <Avatar
          variant="rounded"
          src={group.groupImage}
          alt={group.name}
          sx={{
            width: 72,
            height: 72,
            borderRadius: '16px',
            marginRight: '16px',
          }}
        />
        <Box>
          <Typography variant="h6">{group.name}</Typography>
          <Box display="flex" alignItems="center" marginTop="8px">
            <Chip
              label={group.name}
              size="small"
              sx={{
                marginRight: '8px',
                backgroundColor: group.shade,
                color: 'white',
              }}
            />
            <Chip
              label="Computers"
              size="small"
              sx={{
                marginRight: '8px',
                backgroundColor: group.shade,
                color: 'white',
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          color="success"
          sx={{ marginRight: '8px' }}
          onClick={() => onAccept(group._id)}
        >
          Accept
        </Button>
        <Button variant="outlined" color="inherit" onClick={() => onDecline(group._id)}>
          Decline
        </Button>
      </Box>
    </Box>
  );
};

export default InvitationItem;
