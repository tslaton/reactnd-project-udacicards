// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
// Theme
import theme from '../styles/themes'

class Quiz extends React.Component {
  render() {
    const { deck } = this.props

    return (
      <View>
        <Text>This is a quiz over cards in {deck.title}</Text>
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