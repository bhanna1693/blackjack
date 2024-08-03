import { Deck } from './Deck'
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
    this.deck = new Deck()
    this.deck.shuffle()
    this.players.forEach((player) => {
      player.cards = []
    })
    for (let i = 0; i < 2; i++) {
      this.players.forEach((player) => {
        player.cards.push(this.deck.dealCard())
      })
    }
  }

  getPlayerScore(player: Player) {
    // need to calculate the ace last to account for the case where the ace is worth 11 or 1
    const cardsSorted = [...player.cards].sort((a, b) => (a.isAce ? 1 : -1))

    return cardsSorted.reduce((score, card) => {
      let cardScore = 0
      if (card.rank === 'A') {
        if (score + 11 > 21) {
          cardScore = 1
        } else {
          cardScore = 11
        }
      } else if (['K', 'Q', 'J'].includes(card.rank)) {
        cardScore = 10
      } else {
        cardScore = parseInt(card.rank)
      }
      return score + cardScore
    }, 0)
  }
}
