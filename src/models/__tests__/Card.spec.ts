import { Card } from '@/models/Card'
import type { CardBackChoice, CardRank, CardSuit } from '@/models/card.model'
import { describe, expect, it } from 'vitest'

describe('Card', () => {
  it('should initialize with correct rank and suit', () => {
    const card = new Card({ rank: 'A' as CardRank, suit: 'Hearts' as CardSuit })
    expect(card.rank).toBe('A')
    expect(card.suit).toBe('Hearts')
  })

  it('should return correct color for suit', () => {
    const redCard = new Card({ rank: '5' as CardRank, suit: 'Diamonds' as CardSuit })
    const blackCard = new Card({ rank: '9' as CardRank, suit: 'Clubs' as CardSuit })

    expect(redCard.color).toBe('red')
    expect(blackCard.color).toBe('black')
  })

  it('should return full rank name', () => {
    const aceCard = new Card({ rank: 'A' as CardRank, suit: 'Spades' as CardSuit })
    const kingCard = new Card({ rank: 'K' as CardRank, suit: 'Hearts' as CardSuit })
    const numberCard = new Card({ rank: '7' as CardRank, suit: 'Clubs' as CardSuit })

    expect(aceCard.fullRank).toBe('Ace')
    expect(kingCard.fullRank).toBe('King')
    expect(numberCard.fullRank).toBe('7')
  })

  it('should return full name correctly', () => {
    const card = new Card({ rank: 'Q' as CardRank, suit: 'Diamonds' as CardSuit })
    expect(card.fullName).toBe('Queen of Diamonds')
  })

  it('should return correct ID', () => {
    const card = new Card({ rank: '10' as CardRank, suit: 'Spades' as CardSuit })
    expect(card.id).toBe('10-Spades')
  })

  it('should return correct front image source', () => {
    const card = new Card({ rank: 'J' as CardRank, suit: 'Clubs' as CardSuit })
    const expectedSrc = `${import.meta.env.DEV ? '' : '/blackjack'}/playing_cards/fronts/clubs_jack.svg`
    expect(card.getFrontImgSrc()).toBe(expectedSrc)
  })

  it('should return correct back image source', () => {
    const card = new Card({ rank: 'A' as CardRank, suit: 'Hearts' as CardSuit })
    const backChoice: CardBackChoice = 'astronaut'
    const expectedSrc = `${import.meta.env.DEV ? '' : '/blackjack'}/playing_cards/backs/${backChoice}.svg`
    expect(card.getBackOfCardImgSrc(backChoice)).toBe(expectedSrc)
  })

  it('should correctly identify face cards', () => {
    const faceCard = new Card({ rank: 'K' as CardRank, suit: 'Hearts' as CardSuit })
    const nonFaceCard = new Card({ rank: '8' as CardRank, suit: 'Clubs' as CardSuit })

    expect(faceCard.isFaceCard).toBe(true)
    expect(nonFaceCard.isFaceCard).toBe(false)
  })

  it('should correctly identify aces', () => {
    const aceCard = new Card({ rank: 'A' as CardRank, suit: 'Spades' as CardSuit })
    const nonAceCard = new Card({ rank: 'Q' as CardRank, suit: 'Diamonds' as CardSuit })

    expect(aceCard.isAce).toBe(true)
    expect(nonAceCard.isAce).toBe(false)
  })

  it('should correctly identify honour cards', () => {
    const honourCard = new Card({ rank: 'Q' as CardRank, suit: 'Clubs' as CardSuit })
    const numberCard = new Card({ rank: '9' as CardRank, suit: 'Hearts' as CardSuit })

    expect(honourCard.isHonourCard).toBe(true)
    expect(numberCard.isHonourCard).toBe(false)
  })
})
