// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
// Redux
import { connect } from 'react-redux'
import { createDeck } from './actions'
// Themes
import theme from '../styles/themes'

class NewDeck extends React.Component {
  state = {
    title: '',
    hasIssue: false,
  }

  submitDeck() {
    const title = this.state.title
    this.setState({ hasIssue: !title })
    if (title) {
      this.props.createDeck({ title })
        .then(deck => {
          this.setState({ title: '' })
          const navigation = this.props.navigation
          const forceNavigate = NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' }),
              NavigationActions.navigate({
                routeName: 'DeckDetail',
                params: { deckID: deck.id }
              })
            ],
          })
          this.props.navigation.dispatch(forceNavigate)
        })
    }
  }

  render() {
    const { title, hasIssue } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Create a New Deck</Text>
        <FormLabel>Deck Title</FormLabel>
        <FormInput
          defaultValue="Enter a title for this deck"
          onChangeText={(title) => this.setState({ title })}
          shake={hasIssue}
        />
        {hasIssue &&
          <FormValidationMessage>Every deck requires a title</FormValidationMessage>
        }
        <Button buttonStyle={styles.submit} title="Submit" onPress={this.submitDeck.bind(this)}/>
      </View>
    )
  }
}

export default connect(null, { createDeck })(NewDeck)

NewDeck.PropTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 48,
    marginTop: 40,
    marginBottom: 40,
  },
  submit: {
    marginTop: 20,
    backgroundColor: theme.primaryControl,
  }
})