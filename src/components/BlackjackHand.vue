<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import type { BlackjackPlayer } from '@/models/BlackjackPlayer'
import { computed } from 'vue'

const props = defineProps<{
  player: BlackjackPlayer
}>()

const cards = computed(() => props.player.cards)

const maxWidth = computed(() => `${cards.value.length * 5.5}rem`)
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
    <p class="m-0 mt-1" v-if="!player.isDealer">
      Total:
      <span>{{ player.currentScore }}</span>
    </p>
  </div>
</template>
