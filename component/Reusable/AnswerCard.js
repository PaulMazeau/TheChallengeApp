import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../constant/colors';
import { fonts } from '../../constant/fonts';
import { useTheme } from '../../hooks/useTheme';

export default function AnswerCard({ option, onSelect, index, selectedAnswer, isAnswerCorrect }) {
  const theme = useTheme();
  const styles = getStyles(theme); // Création des styles dynamiquement en fonction du thème

  const optionPrefix = `${index + 1}. `;
  let backgroundColor = colors.Black;

  if (selectedAnswer === index) {
    backgroundColor = isAnswerCorrect ? 'green' : 'red'; // Vert si correct, rouge sinon
  }

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={() => onSelect(index)}>
      <Text style={styles.option}>{optionPrefix} {option}</Text>
    </TouchableOpacity>
  );
}


const getStyles = (theme) => StyleSheet.create({  
    card: {
        minHeight: 40,
        width: '100%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        backgroundColor: theme.reverseBgColor,
        padding: 14,
        marginVertical: 4,
    },
    option: {
      color: theme.reverseTextColor,
      fontFamily: fonts.text
    }
});
