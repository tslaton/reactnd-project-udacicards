// Libraries
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import thunk from 'redux-thunk'
// Modules
import reducer from './reducer'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
)

export default class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </ReduxProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
