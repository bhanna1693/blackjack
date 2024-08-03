<script setup lang="ts">
import { BlackjackCard } from '@/models'
import { Deck } from '@/models/Deck'
import { computed, ref } from 'vue'

const props = defineProps<{
  deck: Deck
}>()
const playerCards = ref<BlackjackCard[]>([])
const dealerCards = ref<BlackjackCard[]>([])
const isPlayerTurn = ref(true)

const playerScore = computed(() => {
  return playerCards.value.reduce((acc, card) => acc + card.value, 0)
})

function startGame() {
  console.log('Game started')
  if (props.deck.isNewDeck()) {
    props.deck.shuffle()
  }
  playerCards.value = []
  dealerCards.value = []
  for (let i = 0; i < 2; i++) {
    playerCards.value.push(props.deck.dealCard()!)
    dealerCards.value.push(props.deck.dealCard()!)
  }
}
function dealCard() {
  console.log('Card dealt')
  playerCards.value.push(props.deck.dealCard()!)
}
function stay() {
  console.log('Player stays')
}
</script>

<template>
  <div class="">
    <button type="button" class="btn" @click="startGame">Start New Game</button>
    <button type="button" class="btn" @click="dealCard">Hit</button>
    <button type="button" class="btn" @click="stay">Stay</button>
  </div>
  <div>Deck has {{ deck.cards.length }} cards.</div>

  <section class="flex flex-col">
    <div>
      Dealer cards:
      <ul>
        <li v-for="card in dealerCards" :key="card.id">
          <div class="card">
            {{ card.fullName }}
          </div>
        </li>
      </ul>
    </div>
    <div>
      Player cards:
      <ul>
        <li v-for="card in playerCards" :key="card.id">{{ card.fullName }}</li>
      </ul>
    </div>
  </section>
</template>
