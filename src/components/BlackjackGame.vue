<script setup lang="ts">
import { Blackjack } from '@/models/BlackjackGame'
import type { Player } from '@/models/Player'
import PlayerHand from './PlayerHand.vue'

const props = defineProps<{
  blackjack: Blackjack
}>()
const dealer = props.blackjack.getDealer()

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
      <PlayerHand :cards="dealer.cards">
        <template v-slot:header v-if="dealer.cards.length">
          <h1>{{ dealer.name }}</h1>
          <h2>
            Total:
            <span
              :class="{
                'text-red-500': blackjack.isPlayerBusted(dealer)
              }"
              >{{ blackjack.getPlayerScore(dealer) }}</span
            >
          </h2>
        </template>

        <template v-slot:actions>
          <div class="mt-4 flex flex-col items-center" v-if="blackjack.isPlayersTurn(dealer)">
            <template v-if="blackjack.isPlayerBusted(dealer)">
              <div class="text-error">Dealer Busted!</div>
            </template>
            <template v-else-if="blackjack.isDealerWinner()">
              <div class="text-success">Dealer Wins!</div>
            </template>
          </div>
        </template>
      </PlayerHand>
    </div>
    <div class="players flex justify-between">
      <template v-for="player of blackjack.getPlayers()" :key="player.name">
        <PlayerHand :cards="player.cards">
          <template v-slot:header v-if="player.cards.length">
            <h1>{{ player.name }}</h1>
            <h2>
              Total:
              <span
                :class="{
                  'text-red-500': blackjack.isPlayerBusted(player)
                }"
                >{{ blackjack.getPlayerScore(player) }}</span
              >
            </h2>
          </template>
          <template v-slot:actions>
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
          </template>
        </PlayerHand>
      </template>
    </div>
  </section>
</template>
