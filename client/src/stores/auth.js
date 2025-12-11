import { defineStore } from 'pinia';
import { create } from '@/api/player';

const useAuthStore = defineStore('auth', {
  state: () => ({
    displayName: localStorage.getItem('displayName') || null,
    id: localStorage.getItem('id') || null,
  }),
  actions: {
    setUser({ id, name }) {
      this.displayName = name;
      this.id = id;
      localStorage.setItem('displayName', name);
      localStorage.setItem('id', id);
    },
    login(name) {
      // TODO: use socket id
      const id = Math.random().toString(36).substring(2, 15);
      this.createPlayer(name, id);
      this.setUser({ id, name });
    },
    logout() {
      localStorage.removeItem('displayName');
      localStorage.removeItem('id', id);
      this.displayName = null;
      this.id = null;
    },
    async createPlayer(name, id = null) {
      if(!id) id = Math.random().toString(36).substring(2, 15);
      const params = { name, id };
      await create(params).then(data => data).catch(error => {
        console.error('Error creating player:', error);
      });
    }
  },
});

export default useAuthStore;
