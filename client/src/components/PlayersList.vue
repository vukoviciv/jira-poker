<template>
  <snackbar :message="message" />
  <div class="col-span-1 md:col-span-1">
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-slate-300">Players</h2>
      <div class="space-y-3">
        <div
          v-for="player in players"
          :key="player.id"
          :class="[{ 'ring-2 ring-cyan-400 border-cyan-400': player.isCurrent }, 'flex items-center gap-3 p-3 bg-slate-700/40 hover:bg-slate-700/60 rounded-lg transition']">
          <div class="flex-1">
            <p class="font-medium text-sm">{{ player.name }}</p>
            <p class="text-xs text-slate-400">
              {{ player.voted ? 'Voted' : 'Waiting to vote...' }} id: {{ player.id }}
            </p>
          </div>
          <div v-if="player.voted" class="w-6 h-6 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">
            <span class="text-xs text-green-400">✓</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Snackbar from '@/components/common/Snackbar.vue';
import { getAll } from '@/api/player';
import useAuthStore from '@/stores/auth';
import { useSocket } from '@/composables/useSocket.js';
import { useSnackbar } from '@/composables/useSnackbar';

const store = useAuthStore();
const players = ref([]);

const processPlayers = data => {
  return data.map(player => {
    return {
      ...player,
      isCurrent: player.id === store.id
    }
  });
}

function loadPlayers () {
  getAll().then(data => {
    const processed = processPlayers(data);
    players.value = processed;
  }).catch(error => {
    console.error(error);
  });
}

loadPlayers();

// Listen for new players joining via Socket.IO
const { on, off } = useSocket();
const { show } = useSnackbar();
const message = ref('');

const handlePlayersUpdated = (payload) => {
  console.log('Players update received:', payload);
  const list = Array.isArray(payload) ? payload : payload?.players || [];
  const processed = processPlayers(list);
  players.value = processed;
};

const handlePlayerJoined = (player) => {
  const exists = players.value.find(p => p.id === player.id);
  if (!exists) {
    players.value.push({ ...player, isCurrent: player.id === store.id });
    message.value = `Player ${player.name} has joined!`;
    show();
  }
};

onMounted(() => {
  on('playerJoined', handlePlayerJoined);
  on('playersUpdated', handlePlayersUpdated);
});

onUnmounted(() => {
  off('playersUpdated', handlePlayersUpdated);
  off('playerJoined', handlePlayerJoined);
});
</script>
