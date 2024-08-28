import { io, Socket } from 'socket.io-client';

const URL = import.meta.env['VITE_APP_API_URL'];

export type Notifications = {
  pendingTransactions: number;
  physicalPoints: number;
};

type NamespaceSpecificServerToClientEvents = {
  joinUserRoom: (userId: string, response?: (notifications: Notifications) => void) => void;
  newPendingTransaction: (notifications: Notifications) => void;
};

export const socket: Socket<NamespaceSpecificServerToClientEvents> = io(URL, {
  autoConnect: false,
});
