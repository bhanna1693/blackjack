import { Deck } from './Deck'
import { GameBase } from './Game'
import type { Player } from './Player'

export class Blackjack extends GameBase {
  title = 'Blackjack'
  activePlayerIdx: number = 0
  dealerFinalScore: number | null = null
  gameStatus: 'inProgress' | 'over' = 'over'

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
  }
  startGame() {
    this.deck = new Deck()
    this.deck.shuffle()
    this.dealerFinalScore = null
    this.players.forEach((player) => {
      player.cards = []
    })
    for (let i = 0; i < 2; i++) {
      this.players.forEach((player) => {
        player.cards.push(this.deck.dealCard())
      })
    }
    this.activePlayerIdx = 0
    this.gameStatus = 'inProgress'
  }
  getDealer(): Player {
    return this.players.find((player) => player.isDealer)!
  }
  getPlayers(): Player[] {
    return this.players.filter((player) => !player.isDealer)
  }
  getActivePlayer(): Player {
    return this.players[this.activePlayerIdx]
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
  playerHit(player: Player) {
    player.cards.push(this.deck.dealCard())
    this.postHit(player)
  }
  postHit(player: Player) {
    if (this.getPlayerScore(player) >= 21) {
      this.activePlayerIdx = this.activePlayerIdx + 1
      this.checkIfDealerTurn()
    }
  }

  playerStay(player: Player) {
    this.activePlayerIdx = this.activePlayerIdx + 1
    this.checkIfDealerTurn()
  }
  checkIfDealerTurn() {
    if (this.getActivePlayer() === this.getDealer()) {
      this.dealerTurn()
    }
  }
  dealerTurn() {
    const dealer = this.getDealer()
    while (this.getPlayerScore(dealer) < 17) {
      dealer.cards.push(this.deck.dealCard())
    }
    this.dealerFinalScore = this.getPlayerScore(dealer)
    this.gameStatus = 'over'
  }
  isPlayerWinner(player: Player): boolean {
    if (this.dealerFinalScore === null) {
      return false
    }
    return this.dealerFinalScore > 21 || this.dealerFinalScore < this.getPlayerScore(player)
  }
  isDealerWinner() {
    if (this.dealerFinalScore === null) {
      return false
    }
    return this.getPlayers().every(
      (player) =>
        this.getPlayerScore(player) > 21 ||
        (this.dealerFinalScore ?? 0) >= this.getPlayerScore(player)
    )
  }
  isPlayerBusted(player: Player): boolean {
    return this.getPlayerScore(player) > 21
  }

  isPlayersTurn(player: Player) {
    return player === this.getActivePlayer()
  }
  isPlayerBlackjack(player: Player) {
    return this.getPlayerScore(player) === 21 && player.cards.length === 2
  }
  isPlayerPush(player: Player) {
    if (player.isDealer) {
      return false
    }
    return this.getPlayerScore(player) === this.dealerFinalScore
  }
}
