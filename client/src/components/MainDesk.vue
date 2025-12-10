<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <main class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PlayersList />
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
import PlayersList from './PlayersList.vue';
import TicketDisplay from './TicketDisplay.vue';
import SelectEstimate from './SelectEstimate.vue';
import VoteResults from './VoteResults.vue';
</script>
