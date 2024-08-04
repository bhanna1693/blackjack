<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import type { Card } from '@/models/Card'
import { Deck } from '@/models/Deck'
import { ref } from 'vue'

const deck = ref<Deck>(new Deck())
const currentCard = ref<Card>()

function dealCard() {
  currentCard.value = deck.value.dealCard()
}
</script>

<template>
  <main>
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

    <div class="flex">
      <div>
        <h2>Deck Details</h2>

        <ul>
          <li v-for="card of deck.cards" :key="card.id">
            {{ card.fullName }}
          </li>
        </ul>
      </div>

      <div v-if="currentCard">
        <h2>Current Card</h2>

        <PlayingCard :card="currentCard" />
      </div>
    </div>
  </main>
</template>
