export type CardRank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'
export type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades'
export type CardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
export type CardColor = 'red' | 'black'
export type CardConstructor = {
  rank: CardRank
  suit: CardSuit
}
