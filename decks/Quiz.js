// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
// Theme
import theme from '../styles/themes'

class Quiz extends React.Component {
  state = {
    currentIndex: 0,
    isFlipped: false,
    points: 0,
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

  flip() {
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
  }

  mark(correct) {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      isFlipped: false,
      points: prevState.points + (correct ? 1 : 0),
    }))
  }

  render() {
    const { deck } = this.props
    const { currentIndex, isFlipped, points } = this.state
    const cards = deck.cards || []
    const card = cards[currentIndex]
    const progressInfo = `${currentIndex + 1} / ${cards.length}`
    const resultsInfo = `You answered ${points} ${points === 1 ? 'question' : 'questions'} correctly`
    const score = `${(100 * points / cards.length).toFixed(0)}%`

    return (
      <View style={{ flex: 1 }}>
        {currentIndex < cards.length
          ? <View style={styles.mainContainer}>
              <Text style={styles.progressInfo}>{progressInfo}</Text>
              {isFlipped
                ? <Text style={styles.answer}>{card.answer}</Text>
                : <Text style={styles.question}>{card.question}</Text>
              }
              <Button
                buttonStyle={styles.primary}
                title={isFlipped ? 'Show Question' : 'Show Answer'}
                onPress={this.flip.bind(this)}
              />
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
              <Text style={styles.results}>Your score for this quiz is: <Text style={styles.score}>{score}</Text></Text>
              <Button
                buttonStyle={styles.primary}
                title={`Return to ${deck.title}`}
                onPress={this.goToDeckDetails.bind(this)}
              />
              <Button
                buttonStyle={styles.secondary}
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

export default connect(mapStateToProps, null)(Quiz)

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
    marginBottom: 80,
    color: theme.question,
  },
  answer: {
    textAlign: 'center',
    fontSize: 48,
    marginTop: 80,
    marginBottom: 80,
    color: theme.answer,
  },
  primary: {
    backgroundColor: theme.primaryControl,
    marginBottom: 20,
  },
  secondary: {
    backgroundColor: theme.secondaryControl,
    marginBottom: 20,
  },
  correct: {
    backgroundColor: theme.accept,
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
  score: {
    fontSize: 32,
    color: theme.accept,
  }
})