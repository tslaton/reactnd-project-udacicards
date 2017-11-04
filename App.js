// Libraries
import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator } from 'react-navigation'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import thunk from 'redux-thunk'
// Modules
import reducer from './reducer'
// Comonents
import DeckList from './decks/DeckList'
import NewDeck from './decks/NewDeck'
// Styles
import theme from './styles/themes'

// temp
import * as api from './utils/api'
// api.deleteAllDecks()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

function StyledStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Navigator = TabNavigator({
  Decks: {
    screen: DeckList,
  },
  'New Deck': {
    screen: NewDeck,
  },
})


export default class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <View style={{ flex: 1 }}>
          <StyledStatusBar backgroundColor={theme.statusBar} barStyle="light-content"/>
          <Navigator/>
        </View>
      </ReduxProvider>
    )
  }
}
