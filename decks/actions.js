import uuid from 'uuid/v1'
import * as api from '../utils/api'
import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
} from '../actions'

export function fetchDecks() {
  return (dispatch) => api.getDecks()
    .then(decks => dispatch(receiveDecks(decks || {})))
}

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function createDeck(deck) {
  return (dispatch) => api.createDeck({ ...deck, id: uuid(), timestamp: Date.now() })
    .then(deck => dispatch(addDeck(deck)))
}

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function createCard(deckID, card) {
  return (dispatch) => api.createCard({ deckID, card: { ...card, id: uuid(), timestamp: Date.now() }})
    .then(card => dispatch(addCard(deckID, card)))
}

function addCard(deckID, card) {
  return {
    type: ADD_CARD,
    deckID,
    card,
  }
}