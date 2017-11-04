// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Button, Platform } from 'react-native'
import { Card, Divider } from 'react-native-elements'
// Icons
import { Ionicons } from '@expo/vector-icons'
// Theme
import theme from '../styles/themes'

export default class DeckHeader extends React.Component {
  render() {
    const { deck, openDeckDetail } = this.props

    return (
      <Card>
        <View>
          <Button
            iconRight
            icon={{
              type: 'ionicon',
              name: Platform.OS === 'ios' ? 'ios-arrow-dropright' : 'md-arrow-dropright',
            }}
            title={deck.title}
            onPress={openDeckDetail}
          />
        </View>
        <Divider style={styles.divider}/>
        <Text style={styles.subtext}>{`${(deck.cards || []).length} cards`}</Text>
      </Card>
    )
  }
}

DeckHeader.PropTypes = {
  deck: PropTypes.object.isRequired,
  openDeckDetail: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    color: theme.header,
  },
  divider: {
    backgroundColor: theme.subtext,
    marginBottom: 10,
    marginBottom: 10,
  },
  subtext: {
    textAlign: 'center',
    color: theme.subtext,
  },
})