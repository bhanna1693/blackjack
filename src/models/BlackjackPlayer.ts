import type { Card } from './Card'
import { Player } from './Player'

export class BlackjackPlayer extends Player {
  finalScore = 0
  currentScore = 0
  hasBlackjack = false
  isBusted = false

  playerReset() {
    this.cards = []
    this.finalScore = 0
    this.currentScore = 0
    this.hasBlackjack = false
    this.isBusted = false
  }
  calculateCurrentState() {
    this.currentScore = this.getPlayerScore()
    this.isBusted = this.currentScore > 21
    this.hasBlackjack = this.cards.length === 2 && this.currentScore === 21
    if (this.isBusted || this.hasBlackjack) {
      this.finalScore = this.currentScore
    }
  }

  addCard(card: Card) {
    this.cards.push(card)
    this.calculateCurrentState()
    if (this.isBusted || this.hasBlackjack) {
      this.stand()
    }
  }

  stand() {
    this.cards.forEach((c) => c.setFaceUp())
    this.calculateCurrentState()
    this.finalScore = this.currentScore
  }

  getPlayerScore() {
    // need to calculate the ace last to account for the case where the ace is worth 11 or 1
    const cardsSorted = [...this.cards].sort((a, b) => (a.isAce ? 1 : -1))

    return cardsSorted.reduce((score, card) => {
      let cardScore = 0
      if (card.rank === 'A') {
        if (score + 11 > 21) {
          cardScore = 1
        } else {
          cardScore = 11
        }
      } else if (['K', 'Q', 'J'].includes(card.rank)) {
        cardScore = 10
      } else {
        cardScore = parseInt(card.rank)
      }
      return score + cardScore
    }, 0)
  }
}
export class BlackjackDealer extends BlackjackPlayer {
  constructor() {
    super({ name: 'Dealer', playerType: 'dealer', cards: [] })
  }
}
