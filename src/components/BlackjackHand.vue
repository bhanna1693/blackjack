<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import type { Card } from '@/models/Card'
import { computed } from 'vue'

const props = defineProps<{
  cards: Card[]
}>()

const total = computed(() => {
  // need to calculate the ace last to account for the case where the ace is worth 11 or 1
  const cardsSorted = [...props.cards].sort((a, b) => (a.isAce ? 1 : -1))

  return cardsSorted.reduce((score, card) => {
    let cardScore = 0
    if (card.rank === 'A') {
      if (score + 11 > 21) {
        cardScore = 1
      } else {
        cardScore = 11
      }
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
      cardScore = 10
    } else {
      cardScore = parseInt(card.rank)
    }
    return score + cardScore
  }, 0)
})

const isBusted = computed(() => total.value > 21)
const maxWidth = computed(() => `${props.cards.length * 5.5}rem`)
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
      <span
        :class="{
          'text-red-500': isBusted
        }"
        >{{ total }}</span
      >
    </p>
  </div>
</template>
