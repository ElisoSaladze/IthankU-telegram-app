import { useEffect, useState } from 'react';
import constate from 'constate';
import { Notifications, socket } from 'src/socket';

const useNotificationsContext = () => {
  const [notifications, setNotifications] = useState<Notifications | null>(null);

  useEffect(() => {
    socket.connect();

    socket.on('newPendingTransaction', (notifications) => {
      setNotifications(notifications);
    });

    return () => {
      socket.off('newPendingTransaction');
    };
  }, []);

  return notifications;
};

export const [NotificationsProvider, useNotifications] = constate(useNotificationsContext);
