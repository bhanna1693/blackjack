import { BlackjackDealer, BlackjackPlayer } from '@/models/BlackjackPlayer'
import { Deck } from '@/models/Deck'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useBlackjackStore = defineStore('blackjack', () => {
  const dealer = ref<BlackjackDealer>(new BlackjackDealer())
  const players = ref<BlackjackPlayer[]>([new BlackjackPlayer({ name: 'Brian' })])

  const activePlayerIndex = ref(0)
  const deck = ref<Deck>(new Deck())
  const isDealersTurn = computed(() => activePlayerIndex.value > players.value.length - 1)

  function startGame() {
    deck.value = new Deck()
    deck.value.shuffle()
    dealer.value.cards = []
    dealer.value.finalScore = 0
    players.value.forEach((player) => {
      player.cards = []
      player.finalScore = 0
    })
    for (let i = 0; i < 2; i++) {
      players.value.forEach((player) => player.cards.push(deck.value.dealCard()))
      dealer.value.cards.push(deck.value.dealCard())
    }
    activePlayerIndex.value = 0
  }
  function nextPlayer() {
    activePlayerIndex.value++
    if (isDealersTurn.value) {
      dealersTurn()
    }
  }
  function playerHit(player: BlackjackPlayer) {
    player.cards.push(deck.value.dealCard())
    if (player.isPlayerBusted() || player.isPlayerBlackjack()) {
      playerStand(player)
    }
  }
  function playerStand(player: BlackjackPlayer) {
    player.playerStand()
    nextPlayer()
  }
  function dealersTurn() {
    console.log('dealer turn')
    while (dealer.value.getPlayerScore() < 17) {
      dealer.value.cards.push(deck.value.dealCard())
    }
    dealer.value.playerStand()
    // this.gameStatus = 'over'
  }

  return {
    dealer,
    players,
    activePlayerIndex,
    deck,
    isDealersTurn,
    startGame,
    playerHit,
    playerStand,
    dealersTurn
  }
})
