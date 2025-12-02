
<template>
  <!-- <br />
  Display Name: {{ name }}
  <br />
  Your ID: {{ socketId }}
  <div>
    <input type="text" v-model="editName" placeholder="Display name..." />
    <button @click="saveDisplayName">Save name</button>
  </div> -->
  <MainDesk />
</template>

<script setup>
import { io } from 'socket.io-client';
import { computed, ref, watch } from 'vue';
import MainDesk from './components/MainDesk.vue';

const displayName = ref(localStorage.getItem('displayName') || '');
const editName = ref(displayName.value);
const saveDisplayName = () => {
  const trimmed = editName.value ? editName.value.trim() : '';
  displayName.value = trimmed;
  localStorage.setItem('displayName', displayName.value);
  displayName.value = '';
};
const name = computed(() => {
  return displayName.value || 'Anonymous';
});

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

