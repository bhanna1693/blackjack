<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import type { BlackjackPlayer } from '@/models/BlackjackPlayer'
import { computed } from 'vue'

const props = defineProps<{
  player: BlackjackPlayer
}>()

const cards = computed(() => props.player.cards)

const maxWidth = computed(() => `${cards.value.length * 5.5}rem`)

const total = computed(() => {
  const player = props.player

  if (player.isDealer && player.finalScore === 0) {
    return player.getPlayerScore(player.cards.slice(1))
  }
  return player.currentScore
})
</script>

<template>
  <div class="flex flex-col items-center" v-if="cards.length">
    <div class="flex content-center" :style="{ maxWidth }">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        :class="[
          'overflow-hidden',
          {
            'overflow-visible': index === cards.length - 1
          }
        ]"
      >
        <PlayingCard :card="card" class="w-36" />
      </div>
    </div>
    <p class="m-0 mt-1">
      Total:
      <span>{{ total }}</span>
    </p>
  </div>
</template>
