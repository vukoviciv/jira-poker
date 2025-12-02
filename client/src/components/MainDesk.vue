<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <MainHeader :players="players" />
    <main class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PlayersList :players="players" />
        <div class="col-span-1 md:col-span-2 space-y-8">
          <TicketDisplay />
          <SelectEstimate />
          <VoteResults />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MainHeader from './MainHeader.vue';
import PlayersList from './PlayersList.vue';
import TicketDisplay from './TicketDisplay.vue';
import SelectEstimate from './SelectEstimate.vue';
import VoteResults from './VoteResults.vue';

const players = ref([
  { id: 1, name: 'Sarah', voted: false },
  { id: 2, name: 'John', voted: false },
  { id: 3, name: 'Alex', voted: true }
]);
</script>
