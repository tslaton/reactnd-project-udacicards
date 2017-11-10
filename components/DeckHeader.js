// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native'
import { Card, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
// Icons
import { Ionicons } from '@expo/vector-icons'
// Theme
import theme from '../styles/themes'

class DeckHeader extends React.Component {
  openDeckDetail() {
    const { deck, navigation } = this.props
    navigation.navigate('DeckDetail', { deckID: deck.id })
  }

  render() {
    const { deck } = this.props
    const numCards = (deck.cards || []).length
    const subtext = numCards === 1 ? '1 card' : `${numCards} cards`
    const latestScore = deck.latestScore

    return (
      <Card>
        <TouchableOpacity style={styles.button} onPress={this.openDeckDetail.bind(this)}>
          <Text style={styles.title}>{deck.title}</Text>
          <Ionicons
            style={{ color: theme.primaryControl, paddingTop: 2 }}
            name={Platform.OS === 'ios' ? 'ios-arrow-dropright' : 'md-arrow-dropright'}
            size={20}
          />
        </TouchableOpacity>
        <Divider style={styles.divider}/>
        <Text style={styles.subtext}>{subtext}</Text>
        {latestScore &&
          <Text style={latestScore.score < 75.0 ? styles.bad : styles.good}>{`${latestScore.score.toFixed(0)}%`}</Text>
        }
      </Card>
    )
  }
}

function mapStateToProps(state, { deckID }) {
  return { deck: state[deckID] }
}

export default connect(mapStateToProps, null)(DeckHeader)

DeckHeader.PropTypes = {
  deckID: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.primaryControl,
    fontSize: 20,
    paddingRight: 6,
  },
  divider: {
    backgroundColor: theme.subtext,
    marginTop: 10,
    marginBottom: 10,
  },
  subtext: {
    textAlign: 'center',
    color: theme.subtext,
  },
  good: {
    textAlign: 'center',
    color: theme.accept,
  },
  bad: {
    textAlign: 'center',
    color: theme.reject,
  },
})