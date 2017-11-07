// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
// Theme
import theme from '../styles/themes'

class DeckDetail extends React.Component {
  addCard() {
    const { deck, navigation } = this.props
    navigation.navigate('AddCard', { deckID: deck.id })
  }

  startQuiz() {
    const { deck, navigation } = this.props
    navigation.navigate('Quiz', { deckID: deck.id, deckDetailKey: navigation.state.key })
  }

  render() {
    const { deck, navigation } = this.props
    const numCards = (deck.cards || []).length
    const subtext = numCards === 1 ? '1 card' : `${numCards} cards`

    return (
      <View>
        <Text style={styles.header}>{deck.title}</Text>
        <Text style={styles.subtext}>{subtext}</Text>
        <Button buttonStyle={styles.card} title="Add Card" onPress={this.addCard.bind(this)}/>
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

export default connect(mapStateToProps, null)(DeckDetail)

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
  quiz: {
    backgroundColor: theme.secondaryControl,
    marginBottom: 20,
  },
})