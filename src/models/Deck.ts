import { BlackjackCard } from './BlackjackCard'
import { type CardRank, type CardSuit } from './card.model'

export class Deck {
  cards: BlackjackCard[] = []
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
  constructor(cards: BlackjackCard[] = []) {
    this.cards = cards
    if (cards.length === 0) {
      this.reset()
    }
  }

  shuffle() {
    // shuffle the deck
    this.cards.sort(() => Math.random() - 0.5)
  }

  dealCard(): BlackjackCard {
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
    Object.keys(this.cardRanks).forEach((suit) => {
      Object.keys(this.cardSuits).forEach((rank) => {
        this.cards.push(new BlackjackCard({ rank: rank as CardRank, suit: suit as CardSuit }))
      })
    })
  }
  isNewDeck() {
    return this.cards.length === 52
  }
}
