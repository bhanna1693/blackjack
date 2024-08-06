// tests/Deck.spec.ts

import { Card } from '@/models/Card'
import { Deck } from '@/models/Deck'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Deck', () => {
  let deck: Deck

  beforeEach(() => {
    deck = new Deck()
  })

  it('should initialize with default number of decks', () => {
    expect(deck.cards.length).toBe(52) // 1 deck has 52 cards
  })

  it('should shuffle the deck', () => {
    const originalOrder = [...deck.cards]
    deck.shuffle()
    expect(deck.cards).not.toEqual(originalOrder)
    // Check if the deck is shuffled
    expect(deck.cards).toEqual(expect.arrayContaining(originalOrder))
  })

  it('should deal a card', () => {
    const card = deck.dealCard()
    expect(deck.cards.length).toBe(51) // One card should be removed
    expect(deck.dealtCards.length).toBe(1) // One card should be dealt
    expect(card).toBeInstanceOf(Card) // Ensure the dealt card is an instance of Card
  })

  it('should throw error when dealing from an empty deck', () => {
    // Empty the deck
    deck.cards = []
    expect(() => deck.dealCard()).toThrow('No more cards in the deck')
  })

  it('should reset the deck to its original state', () => {
    deck.dealCard()
    deck.shuffle()
    expect(deck.cards.length).toBe(51) // After dealing one card, there should be 51 cards
    deck.reset()
    expect(deck.cards.length).toBe(52) // Deck should be reset to 52 cards
  })
})
