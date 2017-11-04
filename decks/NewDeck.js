// Libraries
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
// Redux
import { connect } from 'react-redux'
import { createDeck } from './actions'

class NewDeck extends React.Component {
  state = {
    title: '',
    error: false,
  }

  submitDeck() {
    const title = this.state.title
    this.setState({ error: !title })
    if (title) {
      this.props.createDeck({ title })
    }
  }

  render() {
    const { title, error } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Create a New Deck</Text>
        <FormLabel>Deck Title</FormLabel>
        <FormInput
          defaultValue="Enter a title for this deck"
          onChangeText={(title) => this.setState({ title })}
          shake={error}
        />
        {error &&
          <FormValidationMessage>Every deck requires a title</FormValidationMessage>
        }
        <Button style={{ marginTop: 20 }} title="Submit" onPress={this.submitDeck.bind(this)}/>
      </View>
    )
  }
}

export default connect(null, { createDeck })(NewDeck)

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
})