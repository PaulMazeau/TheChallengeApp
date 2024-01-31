import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnswerCard from './AnswerCard'

export default function AnswerCardStack() {
  return (
    <View style={styles.page}>
        <AnswerCard/>
        <AnswerCard/>
        <AnswerCard/>
        <AnswerCard/>
    </View>
  )
}

const styles = StyleSheet.create({
    page: {
        minHeight: 40,
        width: '100%',
        marginVertical: 24,
    }
})