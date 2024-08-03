import { Card } from './Card'
import { type CardRank, type CardSuit } from './card.model'

export class Deck {
  cards: Card[] = []
  private readonly cardRanks: CardRank[] = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A'
  ]
  private readonly cardSuits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades']
  constructor(cards: Card[] = []) {
    this.cards = cards
    if (cards.length === 0) {
      this.reset()
    }
  }

  shuffle() {
    // shuffle the deck
    this.cards.sort(() => Math.random() - 0.5)
  }

  dealCard(): Card {
    // deal a card
    const card = this.cards.pop()
    if (!card) {
      throw new Error('No more cards in the deck')
    }
    return card
  }

  reset() {
    this.cards = []
    // add all the cards back to the deck
    this.cardRanks.forEach((rank) => {
      this.cardSuits.forEach((suit) => {
        this.cards.push(new Card({ rank: rank as CardRank, suit: suit as CardSuit }))
      })
    })
  }
}
