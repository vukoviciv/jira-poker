<template>
    <div
      id="snackbar" 
      class="bg-[#1e2a3a] border-1 border-cyan-500 text-cyan-400 p-4 rounded-md fixed top-19 left-1/2 -translate-x-1/2 min-w-[250px] max-w-[90%] w-fit z-[9999] shadow-lg">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: '' }
})
</script>

<style lang="css">
#snackbar {
  text-align: center;
  display: none;
}
</style>
