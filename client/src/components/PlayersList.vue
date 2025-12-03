<template>
  <div class="col-span-1 md:col-span-1">
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-slate-300">Players</h2>
      <div class="space-y-3">
        <div
          v-for="player in players"
          :key="player.id"
          class="flex items-center gap-3 p-3 bg-slate-700/40 hover:bg-slate-700/60 rounded-lg transition border border-slate-600"
        >
          <div class="flex-1">
            <p class="font-medium text-sm">{{ player.name }}</p>
            <p class="text-xs text-slate-400">
              {{ player.voted ? 'Voted' : 'Waiting...' }}
            </p>
          </div>
          <div v-if="player.voted" class="w-6 h-6 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">
            <span class="text-xs text-green-400">✓</span>
          </div>
        </div>
      </div>
      <button @click="onAddPlayer" class="w-full mt-6 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition cursor-pointer">
        + Add Player
      </button>
    </div>
  </div>
</template>

<script setup>
import { testApi } from '@/api/test';

defineProps({
  players: { type: Array, required: true }
});

const onAddPlayer = () => {
  testApi().then(data => {
    console.log('API data:', data.message);
  }).catch(error => {
    console.error('API Error:', error);
  });
};
</script>
