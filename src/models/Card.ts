import type { CardBackChoice, CardColor, CardRank, CardSuit } from './card.model'

/**
 * base class that all cards extend from.
 *
 * card terminology shamelessly stolen from wikipedia: https://en.wikipedia.org/wiki/Standard_52-card_deck
 *
 */
export class Card {
  readonly rank: CardRank
  readonly suit: CardSuit
  isFaceDown: boolean
  imgSrc: string
  readonly frontImgSrc: string
  readonly backImgSrc: string
  readonly color: CardColor
  readonly fullRank: string
  readonly fullName: string
  readonly id: string
  readonly isFaceCard: boolean
  readonly isAce: boolean
  readonly isHonourCard: boolean

  readonly cardSuitToColor: Record<CardSuit, CardColor> = {
    Hearts: 'red',
    Diamonds: 'red',
    Clubs: 'black',
    Spades: 'black'
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
  constructor(card: {
    rank: CardRank
    suit: CardSuit
    isFaceDown?: boolean
    backImgChoice?: CardBackChoice
  }) {
    this.rank = card.rank
    this.suit = card.suit
    this.isFaceDown = card.isFaceDown ?? false
    this.color = this.cardSuitToColor[this.suit]
    switch (this.rank) {
      case 'A':
        this.fullRank = 'Ace'
        break
      case 'K':
        this.fullRank = 'King'
        break
      case 'Q':
        this.fullRank = 'Queen'
        break
      case 'J':
        this.fullRank = 'Jack'
        break
      default:
        this.fullRank = this.rank
        break
    }

    this.isAce = this.rank === 'A'
    this.isFaceCard = this.rank === 'K' || this.rank === 'Q' || this.rank === 'J'
    this.isHonourCard = this.isAce || this.isFaceCard
    this.fullName = `${this.fullRank} of ${this.suit}`
    this.id = `${this.rank}-${this.suit}`
    this.frontImgSrc = `${this.assetPrefix}/playing_cards/fronts/${this.suit.toLowerCase()}_${this.fullRank.toLowerCase()}.svg`
    this.backImgSrc = `${this.assetPrefix}/playing_cards/backs/${card.backImgChoice ?? 'astronaut'}.svg`
    this.imgSrc = this.isFaceDown ? this.backImgSrc : this.frontImgSrc
  }

  setFaceDown() {
    this.isFaceDown = true
    this.imgSrc = this.backImgSrc
  }
  setFaceUp() {
    this.isFaceDown = false
    this.imgSrc = this.frontImgSrc
  }
}
