<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import type { Card } from '@/models/Card'

const props = defineProps<{
  cards: Card[]
}>()
</script>

<template>
  <div class="min-h-80 max-w-md">
    <div>
      <slot name="header"></slot>
    </div>

    <div
      class="flex content-center"
      :style="{
        maxWidth: `${cards.length * 5.5}rem`
      }"
    >
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
        <PlayingCard :card="card" />
      </div>
    </div>

    <slot name="actions"></slot>
  </div>
</template>
