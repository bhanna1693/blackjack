<script setup lang="ts">
import { Blackjack } from '@/models/BlackjackGame'
import { computed, onMounted } from 'vue'

const props = defineProps<{
  blackjack: Blackjack
}>()
onMounted(() => {})
const dealer = computed(() => {
  return props.blackjack.players.find((p) => p.isDealer)
})
const activePlayers = computed(() => {
  return props.blackjack.players.filter((p) => !p.isDealer)
})

function startGame() {
  console.log('Game started')
  props.blackjack.startGame()
}
function dealCard() {
  console.log('Card dealt')
}
function stay() {
  console.log('Player stays')
}
</script>

<template>
  <h1>Blackjack</h1>

  <div class="flex items-center justify-center">
    <button type="button" class="btn" @click="startGame">Start New Game</button>
  </div>

  <section class="flex flex-col justify-center items-center">
    <div>
      Dealer cards:
      <ul>
        <li v-for="card in dealer?.cards" :key="card.id">
          <div class="card">
            {{ card.fullName }}
          </div>
        </li>
      </ul>
    </div>
    <div class="" v-for="p of activePlayers" :key="p.name">
      <div>
        {{ p.name }}'s cards:
        <ul>
          <li v-for="card in p.cards" :key="card.id">
            <div class="card">
              {{ card.fullName }}
            </div>
          </li>
        </ul>

        <button type="button" class="btn" @click="dealCard">Hit</button>
        <button type="button" class="btn" @click="stay">Stay</button>
      </div>
    </div>
  </section>
</template>
