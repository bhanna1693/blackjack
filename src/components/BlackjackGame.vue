<script setup lang="ts">
import { useBlackjackStore } from '@/stores/blackjack'
import { storeToRefs } from 'pinia'
import BlackjackHand from './BlackjackHand.vue'

const blackjackStore = useBlackjackStore()

const {
  players,
  dealer,
  activePlayerIndex,
  isDealersTurn,
  isGameOver,
  isGameInProgress,
  isGameInit
} = storeToRefs(blackjackStore)
</script>

<template>
  <section v-if="isGameInProgress || isGameOver" class="flex flex-col justify-center items-center">
    <div v-if="dealer.cards.length">
      <h3 class="text-center">{{ dealer.name }}</h3>
      <BlackjackHand :player="dealer" />
      <div class="mt-4 flex flex-col items-center" v-if="isDealersTurn">
        <template v-if="dealer.isBusted">
          <div class="text-error">Dealer Busted!</div>
        </template>
      </div>
    </div>

    <hr class="divider" />

    <div class="flex justify-between">
      <div v-for="(player, index) of players" :key="player.name">
        <div v-if="player.cards.length">
          <BlackjackHand :player="player" />
          <div class="mt-4 flex flex-col items-center">
            <template v-if="index === activePlayerIndex">
              <div class="text-primary mb-4">Your turn</div>
              <div class="flex justify-center join join-horizontal">
                <button
                  type="button"
                  class="join-item btn btn-primary"
                  @click="blackjackStore.playerHit(player)"
                >
                  Hit
                </button>
                <button
                  type="button"
                  class="join-item btn btn-outline text-primary"
                  @click="blackjackStore.playerStand(player)"
                >
                  Stay
                </button>
              </div>
            </template>
            <template v-else-if="player.isBusted">
              <div class="text-error">Busted!</div>
            </template>
            <template v-else-if="dealer.finalScore === player.finalScore">
              <div class="text-primary">Push</div>
            </template>
            <template v-else-if="!dealer.isBusted && dealer.finalScore > player.finalScore">
              <div class="text-error">Dealer Wins!</div>
            </template>
            <template v-else>
              <div class="text-success">Winner!</div>
              <template v-if="player.hasBlackjack">
                <div class="text-accent">Blackjack!</div>
              </template>
            </template>
          </div>
          <h3 class="text-center">{{ player.name }}</h3>
        </div>
      </div>
    </div>
  </section>
  <div v-if="isGameOver || isGameInit" class="flex items-center justify-center my-8">
    <button type="button" class="btn btn-accent" @click="blackjackStore.startGame">
      Start New Game
    </button>
  </div>
</template>
