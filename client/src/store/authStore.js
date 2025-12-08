import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', {
  state: () => ({
    displayName: localStorage.getItem('displayName') || 'Anonymous',
  }),
  getters: {
    userDisplayName(state) {
      return state.displayName;
    }
  },
  actions: {
    setDisplayName(name) {
      const trimmed = name?.trim() || 'Anonymous';
      this.displayName = trimmed;
      localStorage.setItem('displayName', trimmed);
    },
    logout() {
      localStorage.removeItem('displayName');
      this.displayName = 'Anonymous';
    }
  },
});

export default useAuthStore;
