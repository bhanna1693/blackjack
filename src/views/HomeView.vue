<script setup lang="ts">
import CardList from '@/components/CardList.vue'
import PlayingCard from '@/components/PlayingCard.vue'
import SelectCardBg from '@/components/SelectCardBg.vue'
import { Deck } from '@/models/Deck'
import { useSelectedCardImageStore } from '@/stores/card-background'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const cardBackgroundStore = useSelectedCardImageStore()
const { demoSelectedCard, selectedCardImage } = storeToRefs(cardBackgroundStore)

const deck = ref<Deck>(new Deck({ backImgChoice: selectedCardImage.value }))

const lastDealtCard = computed(() => deck.value.dealtCards[deck.value.dealtCards.length - 1])

// filter out first card because we show the card img instead
const previousDealtCards = computed(() => [...deck.value.dealtCards].reverse().slice(1))

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

    <CardList title="Remaining Cards" :cards="remainingCards" />

    <div>
      <template v-if="lastDealtCard">
        <h3>Last Card Dealt</h3>
        <PlayingCard :card="lastDealtCard" />
      </template>

      <template v-else>
        <h3>No Cards Dealt</h3>
        <PlayingCard :card="demoSelectedCard" />
        <SelectCardBg />
      </template>

      <template v-if="previousDealtCards.length">
        <CardList title="Previous Cards" :cards="previousDealtCards" />
      </template>
    </div>
  </div>
</template>
