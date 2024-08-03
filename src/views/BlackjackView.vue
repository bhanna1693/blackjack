<script setup lang="ts">
import BlackjackGame from '@/components/BlackjackGame.vue'
import { Blackjack } from '@/models/BlackjackGame'
import { Deck } from '@/models/Deck'
import { GameBase } from '@/models/Game'
import { Player } from '@/models/Player'
import { computed, onMounted, ref } from 'vue'

const gameModel = ref<'Blackjack'>()
const players = ref<Player[]>([new Player({ name: 'Brian', playerType: 'player', cards: [] })])
const state = ref('init')
const isLoading = computed(() => state.value === 'loading')
const isLoaded = computed(() => state.value === 'loaded')
const game = ref<GameBase>()

onMounted(() => {
  state.value = 'loading'
  setTimeout(() => {
    gameModel.value = 'Blackjack'
    game.value = new Blackjack({
      players: players.value.concat(
        new Player({ name: 'Dealer', playerType: 'dealer', cards: [] })
      ),
      deck: new Deck()
    })
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
      <BlackjackGame v-if="game instanceof Blackjack" :blackjack="game" />
    </template>
  </div>
</template>
