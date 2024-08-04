import type { CardBackChoice, CardColor, CardRank, CardSuit } from './card.model'

/**
 * base class that all cards extend from.
 *
 * card terminology shamelessly stolen from wikipedia: https://en.wikipedia.org/wiki/Standard_52-card_deck
 *
 */
export class Card {
  rank: CardRank
  suit: CardSuit

  get color(): CardColor {
    return this.cardSuitToColor[this.suit]
  }

  get fullRank(): string {
    switch (this.rank) {
      case 'A':
        return 'Ace'
      case 'K':
        return 'King'
      case 'Q':
        return 'Queen'
      case 'J':
        return 'Jack'
      default:
        return this.rank
    }
  }

  get fullName(): string {
    return `${this.fullRank} of ${this.suit}`
  }

  get id(): string {
    return `${this.rank}-${this.suit}`
  }

  /**
   * needed to work with github pages
   */
  get assetPrefix(): string {
    if (import.meta.env.DEV) {
      return ''
    }

    return '/blackjack'
  }
  getFrontImgSrc(): string {
    return `${this.assetPrefix}/playing_cards/fronts/${this.suit.toLowerCase()}_${this.fullRank.toLowerCase()}.svg`
  }

  getBackOfCardImgSrc(imgChoice: CardBackChoice = 'astronaut'): string {
    return `${this.assetPrefix}/playing_cards/backs/${imgChoice}.svg`
  }

  get isFaceCard(): boolean {
    return this.rank === 'K' || this.rank === 'Q' || this.rank === 'J'
  }
  get isAce(): boolean {
    return this.rank === 'A'
  }
  get isHonourCard(): boolean {
    return this.isFaceCard || this.isAce
  }
  readonly cardSuitToColor: Record<CardSuit, CardColor> = {
    Hearts: 'red',
    Diamonds: 'red',
    Clubs: 'black',
    Spades: 'black'
  }

  constructor(card: { rank: CardRank; suit: CardSuit }) {
    this.rank = card.rank
    this.suit = card.suit
  }
}
