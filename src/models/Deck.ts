import { Card } from './Card'
import { type CardBackChoice, type CardRank, type CardSuit } from './card.model'

export class Deck {
  cards: Card[] = []
  dealtCards: Card[] = []
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
  private readonly cardSuits: CardSuit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  backImgChoice: CardBackChoice
  constructor(options?: { backImgChoice?: CardBackChoice }) {
    this.backImgChoice = options?.backImgChoice ?? 'astronaut'
    this.reset()
  }

  shuffle() {
    // shuffle the deck
    // first attempt - optimizes for simplicity
    // this.cards = [...this.cards].sort(() => Math.random() - 0.5)

    // second attempt - optimizes randomness
    const newCards = []
    let randomIdx = Math.floor(Math.random() * this.cards.length - 1)
    while (this.cards.length) {
      const card = this.cards.splice(randomIdx, 1)
      newCards.push(card[0])
      randomIdx = Math.floor(Math.random() * this.cards.length - 1)
    }
    this.cards = newCards
  }

  dealCard(): Card {
    // deal a card
    const card = this.cards.pop()
    if (!card) {
      throw new Error('No more cards in the deck')
    }
    this.dealtCards.unshift(card)
    return card
  }

  reset() {
    this.cards = []
    this.dealtCards = []
    // add all the cards back to the deck
    this.cardRanks.forEach((rank) => {
      this.cardSuits.forEach((suit) => {
        this.cards.push(
          new Card({
            rank: rank as CardRank,
            suit: suit as CardSuit,
            backImgChoice: this.backImgChoice
          })
        )
      })
    })
  }
}
