import { CardBase } from './CardBase'
import type { CardRank, CardValue } from './card.model'

export class BlackjackCard extends CardBase {
  cardLabelValueMap: Record<CardRank, CardValue> = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  }
  get value(): CardValue {
    return this.cardLabelValueMap[this.rank]
  }
}
