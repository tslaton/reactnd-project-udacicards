// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Button, Platform } from 'react-native'
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
    const score = (deck.latestScore || {}).score

    return (
      <Card>
        <View>
          <Button
            iconRight
            icon={{
              type: 'ionicon',
              name: Platform.OS === 'ios' ? 'ios-arrow-dropright' : 'md-arrow-dropright',
            }}
            title={deck.title}
            onPress={this.openDeckDetail.bind(this)}
          />
        </View>
        <Divider style={styles.divider}/>
        <Text style={styles.subtext}>{subtext}</Text>
        {score &&
          <Text style={score < 75.0 ? styles.bad : styles.good}>{`${score.toFixed(0)}%`}</Text>
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
  header: {
    textAlign: 'center',
    color: theme.header,
  },
  divider: {
    backgroundColor: theme.subtext,
    marginBottom: 10,
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