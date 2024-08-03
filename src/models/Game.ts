import { Deck } from './Deck'
import type { Player } from './Player'

export abstract class GameBase {
  abstract title: 'Blackjack' | string
  players: Player[]
  deck: Deck
  constructor(props: { players: Player[]; deck: Deck }) {
    this.players = props.players
    this.deck = props.deck
  }
}
