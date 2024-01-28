import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function ChallengeCard() {
  return (
    <View style={styles.card}>
      <Image source={require('../../assets/images/test.jpg')} style={styles.image} />
        <View style={styles.bottomCard}>
            <Text>Ceci est une card Challenge</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 200,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: 'black',
  },
  image: {
    width: 200, // largeur souhaitée
    height: '80%', // hauteur souhaitée
    resizeMode: 'cover', // ou 'contain', selon vos besoins
  },
  bottomCard: {
    height: '20%',
  }
});
