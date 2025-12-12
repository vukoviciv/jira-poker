import { io } from 'socket.io-client';
import { ref } from 'vue';

let socketInstance = null;

export function useSocket() {
  const isConnected = ref(false);

  const connect = () => {
    if (socketInstance?.connected) return socketInstance;

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    socketInstance = io(apiUrl);

    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);
      isConnected.value = true;
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      isConnected.value = false;
    });

    socketInstance.on('disconnect', () => {
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
    isConnected
  };
}
