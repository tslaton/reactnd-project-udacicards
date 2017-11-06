// Libraries
import React from 'react'
import PropTypes from 'prop-types'
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
    const { decks, navigation } = this.props

    return (
      <View>
        <FlatList
          data={decks}
          renderItem={({ item }) => <DeckHeader deckID={item.id} navigation={navigation}/>}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

DeckList.propTypes = {
  navigation: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const decks = Object.values(state)
  return { decks }
}

export default connect(mapStateToProps, { fetchDecks })(DeckList)