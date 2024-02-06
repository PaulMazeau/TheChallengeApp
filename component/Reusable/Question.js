import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constant/colors';
import { fonts } from '../../constant/fonts';

export default function Question({ title, question }) {
  return (
    <View style={styles.card}>
      <Text style={styles.classTitle}>Leçon : {title}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question || "Chargement de la question..."}</Text>
      </View>
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
    backgroundColor: colors.Black,
    padding: 14,
    justifyContent: 'center',
  },
  classTitle: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    fontFamily: fonts.text,
    top: 14,
    left: 14,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.text,
    textAlign: 'center',
  }
});
