<script setup lang="ts">
import type { Blackjack } from '@/models/BlackjackGame'
import type { Player } from '@/models/Player'

const props = defineProps<{
  blackjack: Blackjack
  player: Player
}>()
const emit = defineEmits<{
  dealCard: [player: Player]
  stay: [player: Player]
}>()
</script>
<template>
  <div class="min-h-80 max-w-md">
    <div>
      <h1>{{ player.name }}</h1>
      <h2 v-if="player.cards.length">
        Total:
        <span
          :class="{
            'text-red-500': blackjack.isPlayerBusted(player)
          }"
          >{{ blackjack.getPlayerScore(player) }}</span
        >
      </h2>
    </div>
    <div
      class="flex content-center"
      :style="{
        maxWidth: `${player.cards.length * 5.5}rem`
      }"
    >
      <div
        v-for="(card, index) in player.cards"
        :key="card.id"
        :class="[
          'overflow-hidden',
          {
            'overflow-visible': index === player.cards.length - 1
          }
        ]"
      >
        <div class="flex flex-col items-center justify-center shadow-xl w-36 h-48 overflow-auto">
          <figure :title="card.fullName">
            <img :src="card.frontSvgPath" :alt="card.frontSvgPath" />
          </figure>
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-col items-center" v-if="!player.isDealer">
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
          <button type="button" class="join-item btn btn-primary" @click="emit('dealCard', player)">
            Hit
          </button>
          <button
            type="button"
            class="join-item btn btn-outline text-primary"
            @click="emit('stay', player)"
          >
            Stay
          </button>
        </div>
      </template>
    </div>

    <div
      class="mt-4 flex flex-col items-center"
      v-if="player.isDealer && blackjack.isPlayersTurn(player)"
    >
      <template v-if="blackjack.isPlayerBusted(player)">
        <div class="text-error">Dealer Busted!</div>
      </template>
      <template v-else-if="blackjack.isDealerWinner()">
        <div class="text-success">Dealer Wins!</div>
      </template>
    </div>
  </div>
</template>
