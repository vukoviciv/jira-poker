<template>
  <div class="col-span-1 md:col-span-1">
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-slate-300">Players</h2>
      <form @submit.prevent="onAddPlayer">
        <input
          type="text"
          ref="playerNameRef"
          placeholder="Player name"
          v-model="playerName"
          class="w-full mt-4 px-4 py-2 border border-slate-600 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        <button class="w-full mt-6 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition cursor-pointer">
          + Test Add Player
        </button>
      </form>
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
import { ref, useTemplateRef, onMounted } from 'vue';
import { getAll } from '@/api/player';
import useAuthStore from '@/stores/auth';
import { useSocket } from '@/composables/useSocket.js';

const store = useAuthStore();
const players = ref([]);
const playerName = ref('');
const playerNameRef = useTemplateRef('playerNameRef');
const onAddPlayer = async () => {
  if (!playerName.value.trim()) return;

  await store.createPlayer(playerName.value.trim());
  playerName.value = '';
  playerNameRef.value.focus();
  loadPlayers();
};

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
    console.log(processed);
    players.value = processed;
  }).catch(error => {
    console.error(error);
  });
}


loadPlayers();

// Listen for new players joining via Socket.IO
const { getSocket } = useSocket();
onMounted(() => {
  const socket = getSocket();
  if (socket) {
    socket.on('playerJoined', (newPlayer) => {
      console.log('Player joined:', newPlayer);
      // Check if player already exists
      const exists = players.value.find(p => p.id === newPlayer.id);
      if (!exists) {
        const processedPlayer = {
          ...newPlayer,
          isCurrent: newPlayer.id === store.id
        };
        players.value.push(processedPlayer);
      }
    });
  }
});
</script>
