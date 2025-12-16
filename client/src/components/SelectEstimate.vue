<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-slate-300">Select Your Estimate</h2>
    </div>

    <div class="grid grid-cols-8 gap-3">
      <button
        v-for="card in cards"
        :key="card"
        @click="handleCardSelect(card)"
        :class="[
          'p-4 rounded-lg font-bold text-lg transition transform hover:scale-105 border-2 cursor-pointer',
          selectedCard === card
            ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
            : 'border-slate-600 bg-slate-700/40 text-slate-300 hover:border-slate-500'
        ]">
        {{ card }}
      </button>
    </div>

    <div class="flex gap-3 pt-4">
      <button class="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition cursor-pointer">
        Clear Vote
      </button>
      <button
        @click="handleRevealVotes"
        class="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition cursor-pointer">
        Reveal Votes
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSocket } from '@/composables/useSocket.js';

const selectedCard = ref(null);
const cards = [1, 2, 3, 5, 7, 13, 15, 23];
const { getSocket } = useSocket();

const handleCardSelect = (card) => {
  selectedCard.value = card;
  console.log('Selected card:', card);
  const socket = getSocket();
  if (socket) {
    socket.emit('voted', { card });
  } else {
    console.warn('Socket not connected; unable to send vote. Ensure the Room page has initialized the socket connection.');
  }
};

const handleRevealVotes = () => {
  console.log('Revealing votes...');
  // Emit
};
</script>
