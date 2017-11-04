// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
// Theme
import theme from '../styles/themes'

export default class Quiz extends React.Component {
  render() {
    const { navigation } = this.props
    const deck = navigation.state.params.deck

    return (
      <View>
        <Text>This is a quiz over cards in {deck.title}</Text>
      </View>
    )
  }
}

Quiz.PropTypes = {
  navigation: PropTypes.object.isRequired,
}