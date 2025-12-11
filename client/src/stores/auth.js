import { defineStore } from 'pinia';
import { create as createPlayer } from '@/api/player';
import { create } from '../api/player';

const useAuthStore = defineStore('auth', {
  state: () => ({
    displayName: localStorage.getItem('displayName') || null,
  }),
  actions: {
    setDisplayName(name) {
      const trimmed = name?.trim() || 'Anonymous';
      this.displayName = trimmed;
      localStorage.setItem('displayName', trimmed);
    },
    logout() {
      localStorage.removeItem('displayName');
      this.displayName = null;
    },
    createPlayer(name, id = null) {
      if(!id) id = Math.random().toString(36).substring(2, 15);
      const params = {
        name,
        socketId: id, //TODO change,
        isCurrent: true
      }
      createPlayer(params).then(() => {
        this.setDisplayName(name); // TODO: save player data
      }).catch((error) => {
        console.error('Error creating player:', error);
      });
    }
  },
});

export default useAuthStore;
