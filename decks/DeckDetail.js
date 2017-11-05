// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
// Theme
import theme from '../styles/themes'

export default class DeckDetail extends React.Component {
  addCard(deck) {
    const { navigation } = this.props
    navigation.navigate('AddCard', { deck })
  }

  startQuiz(deck) {
    const { navigation } = this.props
    navigation.navigate('Quiz', { deck })
  }

  render() {
    const { navigation } = this.props
    const deck = navigation.state.params.deck

    return (
      <View>
        <Text style={styles.header}>{deck.title}</Text>
        <Text style={styles.subtext}>{`${(deck.cards || []).length} cards`}</Text>
        <Button buttonStyle={styles.card} title="Add Card" onPress={this.addCard.bind(this, deck)}/>
        <Button buttonStyle={styles.quiz} title="Start Quiz" onPress={this.startQuiz.bind(this, deck)}/>
      </View>
    )
  }
}

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