import type { Deck } from './Deck'
import { GameBase } from './Game'
import type { Player } from './Player'

export class Blackjack extends GameBase {
  title = 'Blackjack'

  /**
   * Constructs a new instance of the BlackjackGame class.
   *
   * @param props - The properties for initializing the game.
   * @param props.players - An array of players participating in the game.
   * @param props.deck - The deck of cards used in the game.
   */
  constructor(props: { players: Player[]; deck: Deck }) {
    if (props.players.filter((player) => player.isDealer).length !== 1) {
      throw new Error('There must be exactly one dealer')
    }

    const lastPlayer = props.players[props.players.length - 1]
    if (lastPlayer.isDealer === false) {
      throw new Error('The last player must be the dealer')
    }

    super(props)
  }
  startGame() {
    this.resetGame()
    this.deck.shuffle()
    for (let i = 0; i < 2; i++) {
      this.players.forEach((player) => {
        player.cards.push(this.deck.dealCard())
      })
    }
  }

  resetGame() {
    this.players.forEach((player) => {
      player.cards = []
    })
  }
}
