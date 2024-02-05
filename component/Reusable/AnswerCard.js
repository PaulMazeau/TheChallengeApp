import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AnswerCard({ option, onSelect, index }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(index)}>
      <Text>{option}</Text>
    </TouchableOpacity>
  );
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