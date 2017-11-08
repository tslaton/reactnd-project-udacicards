// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { connect } from 'react-redux'
// Modules
import { createCard } from '../actions'
// Themes
import theme from '../styles/themes'

class AddCard extends React.Component {
  state = {
    question: '',
    answer: '',
    questionHasIssue: false,
    answerHasIssue: false,
  }

  submitCard() {
    const { navigation, deck, createCard } = this.props
    const { question, answer, questionHasIssue, answerHasIssue } = this.state
    if (!questionHasIssue && !answerHasIssue) {
      const card = { question, answer }
      createCard(deck.id, card)
      navigation.goBack()
    }
  }

  render() {
    const { question, answer, questionHasIssue, answerHasIssue } = this.state

    return (
      <View style={styles.container}>
        <FormLabel>Question</FormLabel>
        <FormInput
          defaultValue="Enter a question"
          onChangeText={question => this.setState({ question })}
          shake={questionHasIssue}
        />
        {questionHasIssue &&
          <FormValidationMessage>Every card requires a valid question</FormValidationMessage>
        }
        <FormLabel>Answer</FormLabel>
        <FormInput
          defaultValue="Enter the correct answer"
          onChangeText={answer => this.setState({ answer })}
          shake={answerHasIssue}
        />
        {answerHasIssue &&
          <FormValidationMessage>Every card requires a valid answer</FormValidationMessage>
        }
        <Button buttonStyle={styles.submit} title="Submit" onPress={this.submitCard.bind(this)}/>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const deckID = navigation.state.params.deckID
  return { deck: state[deckID] }
}

export default connect(mapStateToProps, { createCard })(AddCard)

AddCard.PropTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  submit: {
    marginTop: 20,
    backgroundColor: theme.primaryControl,
  }
})