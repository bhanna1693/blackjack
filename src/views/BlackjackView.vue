<script setup lang="ts">
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
  }, 2000)
})
function shuffle() {
  deck.value?.shuffle()
}
function startGame() {
  console.log('Game started')
}
function dealCard() {
  console.log('Card dealt')
}
</script>
<template>
  <button type="button" class="btn btn-blue" @click="shuffle">Shuffle Deck</button>
  <button type="button" @click="startGame">Start Game</button>
  <button type="button" @click="dealCard">Deal Card</button>
  <div>
    <template v-if="isLoading">
      <div>Loading...</div>
    </template>
    <template v-else-if="isLoaded">
      <div>This is the Blackjack view.</div>

      <div v-if="deck">
        <div>Deck has {{ deck.cards.length }} cards.</div>
        <div>First card is {{ deck.cards[0].name }}.</div>
        <div>
          List:
          <ul>
            <li v-for="card in deck.cards" :key="card.id">{{ card.name }}</li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>
