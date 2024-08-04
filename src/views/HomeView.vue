<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import { Deck } from '@/models/Deck'
import { computed, ref } from 'vue'

const deck = ref<Deck>(new Deck())

const lastDealtCard = computed(() => deck.value.dealtCards[0] ?? undefined)
const previousDealtCards = computed(() => deck.value.dealtCards.filter((_, i) => i > 0))

const remainingCards = computed(() => [...deck.value.cards].reverse())
const actionBtns = computed(() => [
  {
    label: 'Shuffle',
    tooltip: 'Shuffles the remaining cards in the deck',
    onClick: () => deck.value.shuffle()
  },
  {
    label: 'Deal Card',
    tooltip: 'Deals a card from the top of the deck.',
    onClick: () => deck.value.dealCard()
  },
  {
    label: 'Reset',
    tooltip: 'Resets the deck to its organized state.',
    onClick: () => deck.value.reset()
  }
])
</script>

<template>
  <h1>Deck of Cards</h1>

  <div class="join join-horizontal">
    <button
      v-for="btn of actionBtns"
      :key="btn.label"
      type="button"
      class="join-item btn btn-outline text-primary tooltip tooltip-primary tooltip-bottom"
      @click="btn.onClick"
      :data-tip="btn.tooltip"
    >
      {{ btn.label }}
    </button>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <h3>Remaining Cards</h3>
      <ul>
        <li v-for="card of remainingCards" :key="card.id">
          {{ card.fullName }}
        </li>
      </ul>
    </div>
    <div v-if="lastDealtCard">
      <h3>Last Card Dealt</h3>
      <p>{{ lastDealtCard.fullName }}</p>
      <PlayingCard :card="lastDealtCard" />

      <template v-if="previousDealtCards.length">
        <h3>Previous Dealt Cards</h3>
        <ul>
          <li v-for="card of previousDealtCards" :key="card.id">
            {{ card.fullName }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
