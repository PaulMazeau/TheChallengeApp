import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function ChallengeCard() {
  return (
    <View style={styles.card}>
      <Text>Que représente l'état (state) dans un composant React ?</Text>
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
