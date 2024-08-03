import type { CardColor, CardLabel, CardSuit, CardValue } from './card.model'

export const cardsValues: CardValue[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
export const cardColors: CardColor[] = ['red', 'black']
export const cardSuits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades']
export const cardLabels: CardLabel[] = [
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
export const cardLabelValueMap: Record<CardLabel, CardValue> = {
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
export const cardSuitToColor: Record<CardSuit, CardColor> = {
  hearts: 'red',
  diamonds: 'red',
  clubs: 'black',
  spades: 'black'
}
