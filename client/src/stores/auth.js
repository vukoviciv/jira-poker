import { defineStore } from 'pinia';
import { create } from '@/api/player';

const useAuthStore = defineStore('auth', {
  state: () => ({
    displayName: localStorage.getItem('displayName') || null,
    id: localStorage.getItem('id') || null,
  }),
  actions: {
    setPlayer({ id, name }) {
      this.displayName = name;
      this.id = id;
      localStorage.setItem('displayName', name);
      localStorage.setItem('id', id);
    },
    async login(userName) {
      const { id, name } = await this.createPlayer(userName);
      this.setPlayer({ id, name });
    },
    logout() {
      localStorage.removeItem('displayName');
      localStorage.removeItem('id');
      this.displayName = null;
      this.id = null;
    },
    createPlayer(name) {
      const params = { name };
      console.log('Creating player with params:', params);
      return create(params)
        .catch(error => {
          console.error('Error creating player:', error);
          throw error;
        });
    }
  },
});

export default useAuthStore;
