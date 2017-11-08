import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  SET_SCORE,
  CLEAR_SCORE,
} from '../actions/types'

export default function decks(state={}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return action.decks
    case ADD_DECK: {
      const deck = action.deck
      return { ...state, [deck.id]: deck }
    }
    case REMOVE_DECK: {
      const deckID = action.deckID
      const decks = { ...state }
      decks[deckID] = undefined
      delete decks[deckID]
      return decks
    }
    case ADD_CARD: {
      const deckID = action.deckID
      const deck = { ...state[deckID] }
      const cards = deck.cards || []
      const card = action.card
      return { ...state, [deckID]: { ...deck, cards: [...cards, card] } }
    }
    case SET_SCORE: {
      const { deckID, score, timestamp } = action
      const deck = { ...state[deckID] }
      const latestScore = { score, timestamp }
      return { ...state, [deckID]: { ...deck, latestScore } }
    }
    case CLEAR_SCORE: {
      const deckID = action.deckID
      const deck = { ...state[deckID] }
      deck.latestScore = undefined
      delete deck.latestScore
      return { ...state, [deckID]: deck }
    }
    default:
      return state
  }
}