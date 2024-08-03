<script setup lang="ts">
import { Blackjack } from '@/models/BlackjackGame'
import type { Player } from '@/models/Player'
import PlayerHand from './PlayerHand.vue'

const props = defineProps<{
  blackjack: Blackjack
}>()

function startGame() {
  console.log('Game started')
  props.blackjack.startGame()
}
function dealCard(player: Player) {
  props.blackjack.playerHit(player)
}
function stay(player: Player) {
  props.blackjack.playerStay(player)
}
</script>

<template>
  <h1>Blackjack</h1>

  <div class="flex items-center justify-center">
    <button type="button" class="btn" @click="startGame">Start New Game</button>
  </div>

  <section class="flex flex-col justify-center items-center">
    <PlayerHand
      :blackjack="blackjack"
      :player="blackjack.getDealer()"
      :dealCard="dealCard"
      :stay="stay"
    />
    <div v-for="p of blackjack.getPlayers()" :key="p.name">
      <PlayerHand :blackjack="blackjack" :player="p" @dealCard="dealCard" @stay="stay" />
    </div>
  </section>
</template>
