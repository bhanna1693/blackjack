import { Deck } from './Deck'
import { GameBase } from './Game'
import type { Player } from './Player'

export class Blackjack extends GameBase {
  title = 'Blackjack'
  activePlayer: Player

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
    props.players = props.players.sort((a, b) => (a.isDealer ? 1 : -1))

    super(props)
    this.activePlayer = this.getPlayers()[0]
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
    this.activePlayer = this.players[0]
  }
  getDealer(): Player {
    return this.players.find((player) => player.isDealer)!
  }
  getPlayers(): Player[] {
    return this.players.filter((player) => !player.isDealer)
  }

  getPlayerScore(player: Player): number {
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

  isPlayerBusted(player: Player): boolean {
    return this.getPlayerScore(player) > 21
  }
  playerHit(player: Player) {
    player.cards.push(this.deck.dealCard())
  }
  playerStay(player: Player) {
    const playerIndex = this.players.indexOf(player)
    if (playerIndex === this.players.length - 1) {
      this.dealerTurn()
    } else {
      this.activePlayer = this.players[playerIndex + 1]
    }
  }
  dealerTurn() {
    const dealer = this.getDealer()
    dealer.cards.push(this.deck.dealCard())
    while (this.getPlayerScore(dealer) < 17) {
      dealer.cards.push(this.deck.dealCard())
    }
    this.calculateWinner()
  }
  calculateWinner() {
    const dealer = this.getDealer()
    const dealerScore = this.getPlayerScore(dealer)
    // this.getPlayers().forEach((player) => {
    //   const playerScore = this.getPlayerScore(player)
    //   if (playerScore > 21) {
    //     player.isWinner = false
    //   } else if (dealerScore > 21 || playerScore > dealerScore) {
    //     player.isWinner = true
    //   } else {
    //     player.isWinner = false
    //   }
    // })
  }
}
