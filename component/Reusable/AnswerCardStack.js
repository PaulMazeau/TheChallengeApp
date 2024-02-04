import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnswerCard from './AnswerCard';

export default function AnswerCardStack({ options = [] }) { // Utilise les options passées en props

  return (
    <View style={styles.page}>
      {options.map((option, index) => (
        <AnswerCard key={index} option={option} />
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
    page: {
        minHeight: 40,
        width: '100%',
        marginVertical: 24,
    }
})