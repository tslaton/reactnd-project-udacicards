// Libraries
import React from 'react'
import { View, FlatList } from 'react-native'
// Redux
import { connect } from 'react-redux'
import { fetchDecks } from './actions'
// Components
import DeckHeader from './DeckHeader'

class DeckList extends React.Component {
  componentDidMount() {
    this.props.fetchDecks()
  }

  render() {
    const { decks } = this.props

    return (
      <View>
        <FlatList
          data={decks}
          renderItem={(item) => <DeckHeader deck={item.item}/>}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const decks = Object.values(state)
  return { decks }
}

export default connect(mapStateToProps, { fetchDecks })(DeckList)