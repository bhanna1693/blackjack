import { BlackjackDealer, BlackjackPlayer } from '@/models/BlackjackPlayer'
import { Deck } from '@/models/Deck'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useBlackjackStore = defineStore('blackjack', () => {
  const dealer = ref<BlackjackDealer>(new BlackjackDealer())
  const players = ref<BlackjackPlayer[]>([new BlackjackPlayer({ name: 'Brian' })])

  const activePlayerIndex = ref(-1)
  const deck = ref<Deck>(new Deck())
  const isDealersTurn = computed(() => activePlayerIndex.value > players.value.length - 1)
  const getActivePlayer = computed(() =>
    activePlayerIndex.value > -1 ? players.value[activePlayerIndex.value] : undefined
  )
  const gameStatus = ref<'init' | 'inProgress' | 'over'>('init')
  const isGameOver = computed(() => gameStatus.value === 'over')
  const isGameInProgress = computed(() => gameStatus.value === 'inProgress')
  const isGameInit = computed(() => gameStatus.value === 'init')

  function startGame() {
    activePlayerIndex.value = -1
    gameStatus.value = 'inProgress'
    deck.value = new Deck()
    deck.value.shuffle()
    dealer.value.playerReset()
    players.value.forEach((player) => player.playerReset())
    for (let i = 0; i < 2; i++) {
      players.value.forEach((player) => player.addCard(deck.value.dealCard()))
      const card = deck.value.dealCard()
      if (i === 0) {
        card.setFaceDown()
      }
      dealer.value.addCard(card)
    }
    nextPlayer()
    if (dealer.value.hasBlackjack) {
      players.value.forEach((p) => playerStand(p))
      dealersTurn()
    }
  }
  function nextPlayer() {
    activePlayerIndex.value++
    if (isDealersTurn.value) {
      dealersTurn()
    } else if (getActivePlayer.value?.hasBlackjack || getActivePlayer.value?.isBusted) {
      nextPlayer()
    }
  }
  function playerHit(player: BlackjackPlayer) {
    player.addCard(deck.value.dealCard())
    if (player.isBusted || player.hasBlackjack) {
      playerStand(player)
    }
  }
  function playerStand(player: BlackjackPlayer) {
    player.stand()
    nextPlayer()
  }
  function dealersTurn() {
    console.log('dealer turn')
    dealer.value.cards.forEach((c) => c.setFaceUp())
    dealer.value.calculateCurrentState()
    while (dealer.value.currentScore < 17) {
      dealer.value.addCard(deck.value.dealCard())
    }
    dealer.value.stand()
    gameStatus.value = 'over'
  }

  return {
    dealer,
    players,
    activePlayerIndex,
    deck,
    isDealersTurn,
    isGameOver,
    isGameInProgress,
    isGameInit,
    startGame,
    playerHit,
    playerStand,
    dealersTurn
  }
})
