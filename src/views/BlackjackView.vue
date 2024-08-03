<script setup lang="ts">
import BlackjackGame from '@/components/BlackjackGame.vue'
import { Deck } from '@/models/Deck'
import { computed, onMounted, ref } from 'vue'

const deck = ref<Deck>()

const state = ref('init')
const isLoading = computed(() => state.value === 'loading')
const isLoaded = computed(() => state.value === 'loaded')

onMounted(() => {
  state.value = 'loading'
  setTimeout(() => {
    deck.value = new Deck()
    state.value = 'loaded'
  }, 500)
})
</script>
<template>
  <div class="max-w-screen-md">
    <template v-if="isLoading">
      <div>Loading...</div>
    </template>
    <template v-else-if="isLoaded">
      <div>This is the Blackjack view.</div>

      <div v-if="deck">
        <BlackjackGame :deck="deck" />
      </div>
    </template>
  </div>
</template>
