// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements'

export default class DeckHeader extends React.Component {
  render() {
    const { deck } = this.props

    return (
      <Card title={deck.title}>
        <Text>{`${(deck.cards || []).length} cards`}</Text>
      </Card>
    )
  }
}

DeckHeader.PropTypes = {
  deck: PropTypes.object.isRequired,
}