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
  <div class="flex items-center justify-center my-4">
    <button type="button" class="btn btn-accent" @click="startGame">Start New Game</button>
  </div>

  <section class="flex flex-col justify-center items-center">
    <div class="dealer">
      <PlayerHand
        :blackjack="blackjack"
        :player="blackjack.getDealer()"
        :dealCard="dealCard"
        :stay="stay"
      />
    </div>
    <div class="players flex justify-between">
      <template v-for="p of blackjack.getPlayers()" :key="p.name">
        <PlayerHand :blackjack="blackjack" :player="p" @dealCard="dealCard" @stay="stay" />
      </template>
    </div>
  </section>
</template>
