import { useEffect, useState } from 'react';
import constate from 'constate';
import { Notifications, socket } from 'src/socket';

const useNotificationsContext = () => {
  const [notifications, setNotifications] = useState<Notifications | null>(null);

  useEffect(() => {
    socket.on('newNotification', (notifications) => {
      setNotifications(notifications);
    });

    return () => {
      socket.off('newNotification');
    };
  }, []);

  return notifications;
};

export const [NotificationsProvider, useNotifications] = constate(useNotificationsContext);
