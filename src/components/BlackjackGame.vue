<script setup lang="ts">
import { Blackjack } from '@/models/BlackjackGame'
import type { Player } from '@/models/Player'
import { computed } from 'vue'
import BlackjackHand from './BlackjackHand.vue'

const props = defineProps<{
  blackjack: Blackjack
}>()
const dealer = computed(() => {
  if (props.blackjack.getDealer().cards.length) {
    return props.blackjack.getDealer()
  }
  return undefined
})
const playersWithCards = computed(() => props.blackjack.getPlayers().filter((p) => p.cards.length))

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
  <section class="flex flex-col justify-center items-center">
    <div class="dealer" v-if="dealer">
      <h3 class="text-center">{{ dealer.name }}</h3>
      <BlackjackHand :cards="dealer.cards" />
      <div class="mt-4 flex flex-col items-center" v-if="blackjack.isPlayersTurn(dealer)">
        <template v-if="blackjack.isPlayerBusted(dealer)">
          <div class="text-error">Dealer Busted!</div>
        </template>
        <template v-else-if="blackjack.isDealerWinner()">
          <div class="text-success">Dealer Wins!</div>
        </template>
      </div>
    </div>
    <hr class="divider" v-if="dealer" />
    <div class="players flex justify-between">
      <div v-for="player of playersWithCards" :key="player.name" :player="player">
        <BlackjackHand :cards="player.cards" />
        <div class="mt-4 flex flex-col items-center">
          <template v-if="blackjack.isPlayerBusted(player)">
            <div class="text-error">Busted!</div>
          </template>
          <template v-else-if="blackjack.isPlayerPush(player)">
            <div class="text-primary">Push</div>
          </template>
          <template v-else-if="blackjack.isPlayerWinner(player)">
            <div class="text-success">Winner!</div>
            <template v-if="blackjack.isPlayerBlackjack(player)">
              <div class="text-accent">Blackjack!</div>
            </template>
          </template>
          <template v-else-if="blackjack.isPlayersTurn(player)">
            <div class="text-primary mb-4">Your turn</div>
            <div class="flex justify-center join join-horizontal">
              <button type="button" class="join-item btn btn-primary" @click="dealCard(player)">
                Hit
              </button>
              <button
                type="button"
                class="join-item btn btn-outline text-primary"
                @click="stay(player)"
              >
                Stay
              </button>
            </div>
          </template>
        </div>
        <h3 class="text-center">{{ player.name }}</h3>
      </div>
    </div>
  </section>
  <div class="flex items-center justify-center my-8">
    <button type="button" class="btn btn-accent" @click="startGame">Start New Game</button>
  </div>
</template>
