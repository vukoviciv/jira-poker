import { io } from 'socket.io-client';
import { ref } from 'vue';

let socketInstance = null;
const EVENT = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error'
}

export function useSocket() {
  const isConnected = ref(false);
  const handlers = new Map();

  const on = (event, handler) => {
    if (!handlers.has(event)) handlers.set(event, new Set());
    handlers.get(event).add(handler);
    if (socketInstance) socketInstance.on(event, handler);
  };

  const off = (event, handler) => {
    if (!handlers.has(event)) return;
    handlers.get(event).delete(handler);
    if (socketInstance) socketInstance.off(event, handler);
  };

  const connect = () => {
    if (socketInstance?.connected) return socketInstance;

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    socketInstance = io(apiUrl);

    socketInstance.on(EVENT.CONNECT, () => {
      console.log('Socket connected:', socketInstance.id);
      isConnected.value = true;
      // attach any registered handlers
      for (const [event, set] of handlers.entries()) {
        for (const handler of set) {
          socketInstance.on(event, handler);
        }
      }
    });

    socketInstance.on(EVENT.CONNECT_ERROR, (error) => {
      console.error('Socket connection error:', error);
      isConnected.value = false;
    });

    socketInstance.on(EVENT.DISCONNECT, () => {
      isConnected.value = false;
    });

    return socketInstance;
  };

  const disconnect = () => {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
      isConnected.value = false;
    }
  };

  const getSocket = () => socketInstance;

  return {
    connect,
    disconnect,
    getSocket,
    on,
    off,
    isConnected
  };
}
