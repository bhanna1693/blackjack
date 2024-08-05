import type { Deck } from './Deck'
import { Player } from './Player'

export class BlackjackPlayer extends Player {
  finalScore = 0

  playerHit(deck: Deck) {
    this.cards.push(deck.dealCard())
  }

  playerStand() {
    this.finalScore = this.getPlayerScore()
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

  playerHasBlackjack() {
    return this.cards.length === 2 && this.getPlayerScore() === 21
  }
  isPlayerBlackjack() {
    return this.getPlayerScore() === 21 && this.cards.length === 2
  }
  isPlayerBusted(): boolean {
    return this.getPlayerScore() > 21
  }
}
export class BlackjackDealer extends BlackjackPlayer {
  constructor() {
    super({ name: 'Dealer', playerType: 'dealer', cards: [] })
  }
}
