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
  <div>
    <h2>{{ player.name }}'s cards:</h2>
    <h2>
      Total:
      <span
        :class="{
          'text-red-500': props.blackjack.isPlayerBusted(player)
        }"
        >{{ props.blackjack.getPlayerScore(player) }}</span
      >
    </h2>
    <ul>
      <li v-for="card in player.cards" :key="card.id">
        <div class="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img :src="card.svgUrl" :alt="card.svgUrl" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ card.fullName }}</h2>
            <div class="card-actions justify-end" v-if="!player.isDealer">
              <button type="button" class="btn" @click="emit('dealCard', player)">Hit</button>
              <button type="button" class="btn" @click="emit('stay', player)">Stay</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
