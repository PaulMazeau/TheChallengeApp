import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AnswerCard() {
  return (
    <View style={styles.card}>
      <Text>A ) AnswerCard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        minHeight: 40,
        width: '100%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        backgroundColor: 'white',
        padding: 14,
        marginVertical: 4,
      },
})