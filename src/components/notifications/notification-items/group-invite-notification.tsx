import { Notification } from '~/api/notifications';
import { NotificationWrapper } from './notification-wrapper';
import { Box, Button, Typography } from '@mui/material';
import { NotificationDate } from './notification-date';
import { InvitationRespondStatus, respondInvitation } from '~/api/groups';
import { useMutation } from '@tanstack/react-query';

type Props = {
  notification: Notification;
};

export const GroupInviteNotification = ({ notification }: Props) => {
  const $respond = useMutation({
    mutationFn: respondInvitation,
  });

  const onRespond = (status: InvitationRespondStatus) => {
    $respond.mutate(
      {
        // inviteId: notification.group.invitationId,
        inviteId: '', // TODO!
        status,
      },
      {
        onSuccess: () => {
          // Delete notification!!
        },
      },
    );
  };

  return (
    <NotificationWrapper avatar={notification.author.picture} isRead={notification.isRead}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'space-between',
          height: 1,
        }}
      >
        <Typography fontSize={14}>
          <Typography component="span" fontSize={14} fontWeight={700}>
            {notification.author.name}
          </Typography>{' '}
          invited you to the group:{' '}
          <Typography component="span" fontSize={14} fontWeight={700}>
            {notification.group?.name}
          </Typography>
        </Typography>

        <Box display="flex" gap={1} my={1}>
          <Button
            onClick={() => {
              onRespond('ACCEPTED');
            }}
            variant="contained"
            sx={{
              fontSize: 16,
              fontWeight: 500,
              px: 5,
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              onRespond('DECLINED');
            }}
            fullWidth
            variant="contained"
            color="secondary"
            sx={{
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Decline
          </Button>
        </Box>

        <NotificationDate date={notification.createdAt} />
      </Box>
    </NotificationWrapper>
  );
};
