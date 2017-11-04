// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
// Theme
import theme from '../styles/themes'

export default class DeckHeader extends React.Component {
  render() {
    const { deck } = this.props

    return (
      <Card title={deck.title}>
        <Text style={styles.subtext}>{`${(deck.cards || []).length} cards`}</Text>
      </Card>
    )
  }
}

DeckHeader.PropTypes = {
  deck: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  subtext: {
    textAlign: 'center',
    color: theme.subtext,
  }
})