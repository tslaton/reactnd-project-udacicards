// Libraries
import React from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import thunk from 'redux-thunk'
// Modules
import reducer from './reducers'
import { setStudyReminder } from './utils/notifications'
// Components
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
// Styles
import theme from './styles/themes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const Tabs = TabNavigator({
  Deck: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    }
  },
}, {
  tabBarOptions: {
    labelStyle: {
      paddingBottom: Platform.OS === 'ios' ? 16 : 0,
    },
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => {
      return {
        title: navigation.state.params.title,
      }
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
    },
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setStudyReminder()
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            translucent
            barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"}
          />
          <MainNavigator/>
        </View>
      </ReduxProvider>
    )
  }
}