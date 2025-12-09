import { defineStore } from 'pinia';

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
    login(displayName) {
      this.setDisplayName(displayName);
    },
    logout() {
      localStorage.removeItem('displayName');
      this.displayName = null;
    }
  },
});

export default useAuthStore;
