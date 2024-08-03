import { cardLabelValueMap, cardSuitToColor } from './card.const'
import type { CardColor, CardConstructor, CardLabel, CardSuit, CardValue } from './card.model'

export class CardBase {
  label: CardLabel
  suit: CardSuit

  get color(): CardColor {
    return cardSuitToColor[this.suit]
  }

  get value(): CardValue {
    return cardLabelValueMap[this.label]
  }
  get name(): string {
    return `${this.label} of ${this.suit}`
  }
  get id(): string {
    return `${this.label}-${this.suit}`
  }

  constructor(card: CardConstructor) {
    this.label = card.label
    this.suit = card.suit
  }
}
