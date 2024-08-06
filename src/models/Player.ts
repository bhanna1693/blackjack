import type { Card } from './Card'

/**
 * Base class that can be extended
 *
 * @see BlackjackPlayer
 */
export class Player {
  readonly playerType: 'player' | 'dealer' = 'player'
  name: string = ''

  /**
   * This might be better suited in the BlackjackPlayer class becuase not every game is an array of cards
   *
   * what if a player has multiple hands? (i.e. a blackjack split)
   *
   */
  cards: Card[] = []
  id: string = ''
  readonly isDealer: boolean

  constructor(props: { name: string; cards?: Card[]; playerType?: 'player' | 'dealer' }) {
    this.name = props.name
    this.id = props.name
    this.playerType = props.playerType ?? 'player'
    this.cards = props.cards ?? []
    this.isDealer = this.playerType === 'dealer'
  }
}
