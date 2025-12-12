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
    async login(name) {
      const id = Math.random().toString(36).substring(2, 15);
      const createdPlayer = await this.createPlayer(name, id);
      console.log('Created player:', createdPlayer);
      this.setPlayer({ id, name });
    },
    logout() {
      localStorage.removeItem('displayName');
      localStorage.removeItem('id');
      this.displayName = null;
      this.id = null;
    },
    createPlayer(name, id = null) {
      if (!id) id = Math.random().toString(36).substring(2, 15);
      const params = { name, id };
      return create(params)
        .catch(error => {
          console.error('Error creating player:', error);
          throw error;
        });
    }
  },
});

export default useAuthStore;
