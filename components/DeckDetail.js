// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
// Modules
import { formatTime } from '../utils'
import { deleteDeck } from '../actions'
// Theme
import theme from '../styles/themes'

class DeckDetail extends React.Component {
  addCard() {
    const { deck, navigation } = this.props
    navigation.navigate('AddCard', { deckID: deck.id })
  }

  deleteSelf() {
    const { deck, deleteDeck, navigation } = this.props
    deleteDeck(deck.id)
      .then(() => navigation.goBack())
  }

  startQuiz() {
    const { deck, navigation } = this.props
    navigation.navigate('Quiz', { deckID: deck.id, deckDetailKey: navigation.state.key })
  }

  render() {
    const { deck, navigation } = this.props
    if (!deck) {
      return (
        <View>
          <Text style={styles.header}>Deleting...</Text>
        </View>
      )
    }
    const numCards = (deck.cards || []).length
    const subtext = numCards === 1 ? '1 card' : `${numCards} cards`
    const latestScore = deck.latestScore

    return (
      <View>
        <Text style={styles.header}>{deck.title}</Text>
        <Text style={styles.subtext}>{subtext}</Text>
        <Text style={styles.subtext}>
          {latestScore
            ? <Text>
                <Text style={latestScore.score < 75.0 ? styles.bad : styles.good}>
                  {`${latestScore.score.toFixed(0)}% `}
                </Text>
                {formatTime(latestScore.timestamp)}
              </Text>
            : <Text>No score yet</Text>
          }
        </Text>
        <Button buttonStyle={styles.card} title="Add Card" onPress={this.addCard.bind(this)}/>
        <Button buttonStyle={styles.delete} title="Delete Deck" onPress={this.deleteSelf.bind(this)}/>
        {numCards > 0 &&
          <Button buttonStyle={styles.quiz} title="Start Quiz" onPress={this.startQuiz.bind(this)}/>
        }
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const deckID = navigation.state.params.deckID
  return { deck: state[deckID] }
}

export default connect(mapStateToProps, { deleteDeck })(DeckDetail)

DeckDetail.PropTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 48,
    marginTop: 40,
    marginBottom: 20,
    color: theme.header,
  },
  subtext: {
    textAlign: 'center',
    fontSize: 24,
    color: theme.subtext,
    marginBottom: 20,
  },
  card: {
    backgroundColor: theme.primaryControl,
    marginTop: 60,
    marginBottom: 20,
  },
  delete: {
    backgroundColor: theme.secondaryControl,
    marginBottom: 20,
  },
  quiz: {
    backgroundColor: theme.tertiaryControl,
    marginBottom: 20,
  },
  good: {
    color: theme.accept,
  },
  bad: {
    color: theme.reject,
  },
})