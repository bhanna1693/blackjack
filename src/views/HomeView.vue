<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import { Card } from '@/models/Card'
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
    label: 'Reset',
    tooltip: 'Resets the deck to its organized state.',
    onClick: () => deck.value.reset()
  }
])
const unknownCard = new Card({ rank: '10', suit: 'Clubs' })
</script>

<template>
  <h1>Deck of Cards</h1>

  <div class="grid grid-cols-2 gap-4">
    <div class="join join-horizontal w-full">
      <button
        v-for="btn of actionBtns"
        :key="btn.label"
        type="button"
        class="join-item btn btn-outline text-primary tooltip tooltip-primary tooltip-bottom w-[50%]"
        @click="btn.onClick"
        :data-tip="btn.tooltip"
      >
        {{ btn.label }}
      </button>
    </div>
    <div>
      <button type="button" class="btn btn-accent w-full" @click="deck.dealCard">
        Click to deal card
      </button>
    </div>
    <div>
      <h3>Remaining Cards</h3>
      <ul>
        <li v-for="card of remainingCards" :key="card.id">
          {{ card.fullName }}
        </li>
      </ul>
    </div>
    <div>
      <template v-if="lastDealtCard">
        <h3>Last Card Dealt</h3>
        <PlayingCard :card="lastDealtCard" />
      </template>

      <template v-else>
        <h3>No Cards Dealt</h3>
        <PlayingCard :card="unknownCard" :isFaceDown="true" />
      </template>

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
