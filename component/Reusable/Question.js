import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Question({ title, question }) {
  
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
      <Text>{question || "Chargement de la question..."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: '40%',
    width: '100%',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: 'white',
    padding: 14,
  },
});
