<template>
  <div class="room-page">
    <main-desk />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import MainDesk from '@/components/MainDesk.vue';
import { useSocket } from '@/composables/useSocket.js';

const { connect, disconnect } = useSocket();

onMounted(() => {
  connect();
});

onUnmounted(() => {
  disconnect();
});
</script>
