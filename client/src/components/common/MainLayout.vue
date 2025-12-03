<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <MainHeader :players="[]" />
    <main class="max-w-7xl mx-auto px-6 py-12">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import MainHeader from '../MainHeader.vue';
</script>
