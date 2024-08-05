<script setup lang="ts">
import BlackjackGame from '@/components/BlackjackGame.vue'
import { computed, onMounted, ref } from 'vue'

const state = ref('init')
const isLoading = computed(() => state.value === 'loading')
const isLoaded = computed(() => state.value === 'loaded')

onMounted(() => {
  state.value = 'loading'
  setTimeout(() => {
    state.value = 'loaded'
  }, 500)
})
</script>
<template>
  <template v-if="isLoading">
    <div>Loading...</div>
  </template>
  <template v-else-if="isLoaded">
    <BlackjackGame />
  </template>
</template>
