<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import { Deck } from '@/models/Deck'
import { computed, ref } from 'vue'

const deck = ref<Deck>(new Deck())

const lastCardDealt = computed(() =>
  deck.value.dealtCards.length ? deck.value.dealtCards[0] : undefined
)

function dealCard() {
  deck.value.dealCard()
}
</script>

<template>
  <h1>Basic Deck Implementation</h1>

  <div class="join join-horizontal">
    <button type="button" class="join-item btn btn-outline text-primary" @click="deck.shuffle">
      Shuffle
    </button>
    <button type="button" class="join-item btn btn-outline text-primary" @click="dealCard">
      Deal Card
    </button>
    <button type="button" class="join-item btn btn-outline text-primary" @click="deck.reset">
      Reset
    </button>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="col-span-2">
      <h2>Deck Details</h2>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3>Remaining Cards</h3>
          <ul>
            <li v-for="card of deck.cards" :key="card.id">
              {{ card.fullName }}
            </li>
          </ul>
        </div>
        <div v-if="lastCardDealt">
          <h3>Last Card Dealt</h3>
          <p>{{ lastCardDealt.fullName }}</p>
          <PlayingCard :card="lastCardDealt" />

          <h3>Previous Dealt Cards</h3>
          <ul v-if="deck.dealtCards.length">
            <li v-for="card of deck.dealtCards" :key="card.id">
              {{ card.fullName }}
            </li>
          </ul>

          <template v-else>No card dealt</template>
        </div>
      </div>
    </div>
  </div>
</template>
