<template>
  <header class="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <span class="text-lg">♠️</span>
        </div>
        <div class="flex items-center">
          <h1 class="text-2xl font-bold">Poker Planning</h1>
          <div v-if="displayName" class="gap-2 ml-2 px-4 py-2 bg-slate-700 rounded-lg text-cyan-400">
            <span class="text-sm">{{ displayName }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="flex items-center cursor-pointer gap-2 px-4 py-2 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition">
          <span>📤</span>Invite
        </button>
        <button
          @click="logout"
          class="flex items-center gap-2 px-4 py-2 cursor-pointer border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import useAuthStore from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const { displayName } = storeToRefs(store);
const router = useRouter();

const logout = () => {
  store.logout();
  router.push({ name: 'Home' });
};
</script>

