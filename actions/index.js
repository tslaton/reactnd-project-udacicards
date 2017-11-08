import uuid from 'uuid/v1'
import * as api from '../utils/api'
import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  SET_SCORE,
  CLEAR_SCORE,
} from './types'

export function fetchDecks() {
  return dispatch => api.getDecks()
    .then(decks => dispatch(receiveDecks(decks || {})))
}

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function createDeck(deck) {
  return dispatch => api.createDeck({ ...deck, id: uuid(), timestamp: Date.now() })
    .then(deck => {
      dispatch(addDeck(deck))
      return deck
    })
}

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function deleteDeck(deckID) {
  return dispatch => api.deleteDeck(deckID)
    .then(deckID => dispatch(removeDeck(deckID)))
}

function removeDeck(deckID) {
  return {
    type: REMOVE_DECK,
    deckID,
  }
}

export function createCard(deckID, card) {
  return dispatch => api.createCard(deckID, { ...card, id: uuid(), timestamp: Date.now()})
    .then(card => {
      dispatch(addCard(deckID, card))
      dispatch(deleteScore(deckID))
    })
}

function addCard(deckID, card) {
  return {
    type: ADD_CARD,
    deckID,
    card,
  }
}

export function recordScore(deckID, score) {
  return dispatch => api.recordScore(deckID, score, Date.now())
    .then(({ score, timestamp, deckID }) => dispatch(setScore(deckID, score, timestamp)))
}

function setScore(deckID, score, timestamp) {
  return {
    type: SET_SCORE,
    deckID,
    score,
    timestamp,
  }
}

function deleteScore(deckID) {
  return dispatch => api.deleteScore(deckID)
    .then(deckID => dispatch(clearScore(deckID)))
}

function clearScore(deckID) {
  return {
    type: CLEAR_SCORE,
    deckID,
  }
}