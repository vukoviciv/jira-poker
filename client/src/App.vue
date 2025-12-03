<template>
  <main-layout>
    <router-view />
  </main-layout>
</template>

<script setup>
import { io } from 'socket.io-client';
import { computed, ref } from 'vue';
import MainLayout from './components/common/MainLayout.vue';

const apiUrl = import.meta.env.VITE_API_URL;
const socketOptions = {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling']
};
const socket = io(apiUrl, socketOptions);
let socketId = ref(null);
socket.on('connect', () => {
  console.log('Connected:', socket.id);
  socketId.value = socket.id;
});
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});
</script>

