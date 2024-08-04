import { Deck } from './Deck'
import type { Player } from './Player'

export abstract class GameBase {
  abstract title: 'Blackjack' | string
  players: Player[]
  playerMap: Record<string, Player> = {}
  deck: Deck
  constructor(props: { players: Player[]; deck: Deck }) {
    this.players = props.players
    this.deck = props.deck
    this.players.forEach((player) => {
      if (this.playerMap[player.id]) {
        throw new Error(`Duplicate player id: ${player.id}`)
      }
      this.playerMap[player.id] = player
    })
  }
  getPlayer(id: string): Player {
    return this.playerMap[id]
  }
}
