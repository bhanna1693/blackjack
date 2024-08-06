<script setup lang="ts">
import type { BlackjackPlayer } from '@/models/BlackjackPlayer'
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

function getPlayerResult(p: BlackjackPlayer): { msg: string; className: string } | undefined {
  if (p.isBusted) {
    return {
      msg: 'Busted!',
      className: 'text-error'
    }
  }
  if (isGameOver) {
    if (dealer.value.finalScore === p.finalScore) {
      return {
        msg: 'Push',
        className: 'text-primary'
      }
    } else if (!dealer.value.isBusted && dealer.value.finalScore > p.finalScore) {
      return {
        msg: 'You lost!',
        className: 'text-error'
      }
    } else {
      return {
        msg: p.hasBlackjack
          ? 'Winner winner chicken dinner!'
          : dealer.value.isBusted
            ? 'Dealer Busted, You Won!'
            : 'You Won!',
        className: 'text-success'
      }
    }
  }
}
</script>

<template>
  <section v-if="isGameInProgress || isGameOver" class="flex flex-col justify-center items-center">
    <div v-if="dealer.cards.length">
      <h3 class="text-center">{{ dealer.name }}</h3>
      <BlackjackHand :player="dealer" />
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
                <button
                  type="button"
                  class="join-item btn btn-outline text-primary"
                  @click="blackjackStore.playerDoubleDown(player)"
                  v-if="player.cards.length === 2"
                >
                  Double Down
                </button>
              </div>
            </template>
            <template v-else>
              <div :class="getPlayerResult(player)?.className">
                {{ getPlayerResult(player)?.msg }}
              </div>
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
