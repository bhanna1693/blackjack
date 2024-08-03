import { cardLabelValueMap, cardSuitToColor } from './card.const'
import type { CardLabel, CardSuit } from './card.model'
import { CardBase } from './CardBase'

export class Deck {
  public cards: CardBase[] = []
  constructor(cards: CardBase[] = []) {
    this.cards = cards
    if (cards.length === 0) {
      this.reset()
    }
  }

  public shuffle() {
    // shuffle the deck
    this.cards.sort(() => Math.random() - 0.5)
  }

  public deal(): CardBase {
    // deal a card
    const card = this.cards.pop()
    if (!card) {
      throw new Error('No more cards in the deck')
    }
    return card
  }

  public reset() {
    this.cards = []
    // add all the cards back to the deck
    Object.keys(cardSuitToColor).forEach((suit) => {
      Object.keys(cardLabelValueMap).forEach((label) => {
        this.cards.push(new CardBase({ label: label as CardLabel, suit: suit as CardSuit }))
      })
    })
  }
}
