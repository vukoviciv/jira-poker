<template>
  <div v-if="displayName">
    <h1>Welcome back {{ displayName }}!</h1>
    <div>
      <router-link to="/room" class="underline decoration-sky-400 underline-offset-3 hover:decoration-2 dark:text-white">
        Enter room &rarr;
      </router-link>
    </div>
  </div>
  <div v-else>
    <form>
      <input v-model="editName" type="text" placeholder="Enter your display name" class="px-4 py-2 border border-slate-600 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
      <button @click="save" class="ml-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const displayName = ref(localStorage.getItem('displayName') || null);
const editName = ref(displayName.value);
// TODO: use store for display name
const save = () => {
  const trimmed = editName.value ? editName.value.trim() : '';
  displayName.value = trimmed;
  localStorage.setItem('displayName', displayName.value);
  window.dispatchEvent(new CustomEvent('displayNameChanged', displayName.value ));
};
</script>
