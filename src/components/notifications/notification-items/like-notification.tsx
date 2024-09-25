import { Notification } from '~/api/notifications';
import { NotificationWrapper } from './notification-wrapper';
import { Box, Typography } from '@mui/material';
import { NotificationDate } from './notification-date';

type Props = {
  notification: Notification;
};

export const LikeNotification = ({ notification }: Props) => {
  const summary = notification.post?.summary;

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
          liked your post:{' '}
          {summary && (
            <Typography component="span" fontSize={14}>
              {summary.length > 65 ? `${summary.slice(0, 65)}...` : summary}
            </Typography>
          )}
        </Typography>
        <NotificationDate date={notification.createdAt} />
      </Box>
    </NotificationWrapper>
  );
};
