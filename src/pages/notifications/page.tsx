import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { match, P } from 'ts-pattern';
import { getNotifications, Notification, NotificationType } from '~/api/notifications';
import { qk } from '~/api/query-keys';
import { paths } from '~/app/routes';
import { AppHeader } from '~/components/header';
import { GroupInviteNotification, LikeNotification, NotificationsFilter } from '~/components/notifications';
import { Progress } from '~/components/progress';

const notificationItems: Record<NotificationType, ({ notification }: { notification: Notification }) => JSX.Element> = {
  LIKE: LikeNotification,
  GROUP_INVITE: GroupInviteNotification,
  NEW_GROUP_POST: GroupInviteNotification,
  TRANSACTION: GroupInviteNotification,
};

export const NotificationsPage = () => {
  const $notifications = useQuery({
    queryKey: qk.notifications.list.toKey(),
    queryFn: getNotifications,
  });

  return (
    <Box>
      <AppHeader backPath={paths.home} hideNotifications />

      <Box sx={{ py: 3, pt: 0, position: 'relative', width: 1, height: 1 }}>
        {match($notifications)
          .with({ isLoading: true }, () => <Progress centered />)
          .with({ isSuccess: true, data: P.select() }, ({ data: notifications }) => {
            if (notifications.length === 0) {
              return (
                <Typography textAlign="center" color="text.secondary">
                  No notifications found.
                </Typography>
              );
            }

            return (
              <>
                <NotificationsFilter />

                {notifications.map((notification) => {
                  const CurrentNotification = notificationItems[notification.type];

                  return <CurrentNotification key={notification.id} notification={notification} />;
                })}
              </>
            );
          })
          .run()}
      </Box>
    </Box>
  );
};
