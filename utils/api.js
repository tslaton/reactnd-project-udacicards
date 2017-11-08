import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function deleteAllDecks() {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({}))
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(data => data ? JSON.parse(data) : {})
}

function setDecks(decks) {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
}

export function createDeck(deck) {
  return getDecks()
    .then(decks => {
      setDecks({ ...decks, [deck.id]: deck })
      return deck
    })
}

export function deleteDeck(deckID) {
  return getDecks()
    .then(decks => {
      decks[deckID] = undefined
      delete decks[deckID]
      setDecks(decks)
      return deckID
    })
}

export function getDeck(id) {
  return getDecks()
    .then(decks => decks[id])
}

export function createCard(deckID, card) {
  return getDecks()
    .then(decks => {
      const deck = decks[deckID]
      const cards = deck.cards || []
      setDecks({ ...decks, [deckID]: { ...deck, cards: [...cards, card] } })
      return card
    })
}

export function recordScore(deckID, score, timestamp) {
  return getDecks()
    .then(decks => {
      const deck = decks[deckID]
      const latestScore = {
        score,
        timestamp,
      }
      setDecks({ ...decks, [deckID]: { ...deck, latestScore } })
      return { ...latestScore, deckID }
    })
}

export function deleteScore(deckID) {
  return getDecks()
    .then(decks => {
      const deck = decks[deckID]
      deck.latestScore = undefined
      delete deck.latestScore
      setDecks({ ...decks, [deckID]: deck })
      return deckID
    })
}