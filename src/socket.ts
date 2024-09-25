import { io, Socket } from 'socket.io-client';
import { globalAccessToken } from './app/auth/access-token';

const URL = import.meta.env['VITE_APP_API_URL'];

export type Notifications = {
  count: number;
};

type NamespaceSpecificServerToClientEvents = {
  newNotification: (notifications: Notifications) => void;
};

console.log({ globalAccessToken });

export const socket: Socket<NamespaceSpecificServerToClientEvents> = io(URL, {
  autoConnect: false,
});
