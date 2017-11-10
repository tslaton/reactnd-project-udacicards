// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
// Modules
import { recordScore } from '../actions'
// Theme
import theme from '../styles/themes'

class Quiz extends React.Component {
  state = {
    currentIndex: 0,
    isFlipped: false,
    points: 0,
  }

  getCards() {
    const { deck } = this.props
    return deck.cards || []
  }

  goToDeckList() {
    const { navigation } = this.props
    const deckDetailKey = navigation.state.params.deckDetailKey
    navigation.goBack(deckDetailKey)
  }

  goToDeckDetails() {
    const { navigation } = this.props
    navigation.goBack()
  }

  restart() {
    this.setState({
      currentIndex: 0,
      isFlipped: false,
      points: 0,
    })
  }

  flip() {
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
  }

  mark(correct) {
    const points = this.state.points + (correct ? 1 : 0)
    const nextIndex = this.state.currentIndex + 1
    const numCards = this.getCards().length
    const shouldSubmitScore = nextIndex >= numCards
    if (shouldSubmitScore) {
      const { deck, recordScore } = this.props
      recordScore(deck.id, 100 * points / numCards)
    }
    this.setState({
      currentIndex: nextIndex,
      isFlipped: false,
      points: points,
    })
  }

  render() {
    const { deck } = this.props
    const { currentIndex, isFlipped, points } = this.state
    const cards = this.getCards()
    const card = cards[currentIndex]
    const progressInfo = `${currentIndex + 1} / ${cards.length}`
    const resultsInfo = `You answered ${points} ${points === 1 ? 'question' : 'questions'} correctly`
    const score = 100 * points / cards.length

    return (
      <View style={{ flex: 1 }}>
        {currentIndex < cards.length
          ? <View style={styles.mainContainer}>
              <Text style={styles.progressInfo}>{progressInfo}</Text>
              {isFlipped
                ? <Text style={styles.answer}>{card.answer}</Text>
                : <Text style={styles.question}>{card.question}</Text>
              }
              <TouchableOpacity onPress={this.flip.bind(this)}>
                <Text style={styles.flipper}>{isFlipped ? 'Show Question' : 'Show Answer'}</Text>
              </TouchableOpacity>
              <Button
                buttonStyle={styles.correct}
                title="Correct"
                onPress={this.mark.bind(this, true)}
              />
              <Button
                buttonStyle={styles.incorrect}
                title="Incorrect"
                onPress={this.mark.bind(this, false)}
              />
            </View>
          : <View style={styles.resultsContainer}>
              <Text style={styles.results}>{resultsInfo}</Text>
              <Text style={styles.results}>Your score is:&nbsp;
                <Text style={score < 75.0 ? styles.bad : styles.good}>{`${score.toFixed(0)}%`}</Text>
              </Text>
              <Button
                buttonStyle={styles.primary}
                title="Retake Quiz"
                onPress={this.restart.bind(this)}
              />
              <Button
                buttonStyle={styles.secondary}
                title={`Return to ${deck.title}`}
                onPress={this.goToDeckDetails.bind(this)}
              />
              <Button
                buttonStyle={styles.tertiary}
                title="Return to Deck List"
                onPress={this.goToDeckList.bind(this)}
              />
            </View>
        }
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const deckID = navigation.state.params.deckID
  return { deck: state[deckID] }
}

export default connect(mapStateToProps, { recordScore })(Quiz)

Quiz.PropTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  progressInfo: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontSize: 24,
    marginTop: 10,
    marginLeft: 10,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  question: {
    textAlign: 'center',
    fontSize: 48,
    marginTop: 80,
    marginBottom: 20,
    color: theme.question,
  },
  answer: {
    textAlign: 'center',
    fontSize: 48,
    marginTop: 80,
    marginBottom: 20,
    color: theme.answer,
  },
  flipper: {
    textAlign: 'center',
    fontSize: 24,
    color: theme.primaryControl,
  },
  primary: {
    backgroundColor: theme.primaryControl,
    marginBottom: 20,
  },
  secondary: {
    backgroundColor: theme.secondaryControl,
    marginBottom: 20,
  },
  tertiary: {
    backgroundColor: theme.tertiaryControl,
    marginBottom: 20,
  },
  correct: {
    backgroundColor: theme.accept,
    marginTop: 60,
    marginBottom: 20,
  },
  incorrect: {
    backgroundColor: theme.reject,
    marginBottom: 20,
  },
  results: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 40,
  },
  good: {
    fontSize: 32,
    color: theme.accept,
  },
  bad: {
    fontSize: 32,
    color: theme.reject,
  },
})