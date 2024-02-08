import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { fonts } from '../../constant/fonts';

export default function AnswerCard({ option, onSelect, index, selectedAnswer, isAnswerCorrect }) {
  const theme = useTheme();
  // Passez selectedAnswer et isAnswerCorrect à getStyles pour déterminer la couleur de fond
  const styles = getStyles(theme, selectedAnswer === index, isAnswerCorrect);

  const optionPrefix = `${index + 1}. `;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(index)}>
      <Text style={styles.option}>{optionPrefix} {option}</Text>
    </TouchableOpacity>
  );
}

// Modifiez getStyles pour accepter selected et isCorrect
const getStyles = (theme, selected, isCorrect) => StyleSheet.create({  
    card: {
        minHeight: 40,
        width: '100%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        // Utilisez la condition pour déterminer la couleur de fond
        backgroundColor: selected ? (isCorrect ? 'green' : 'red') : theme.reverseBgColor,
        padding: 14,
        marginVertical: 4,
    },
    option: {
      // Assurez-vous que la couleur du texte est visible contre le fond
      color: theme.reverseTextColor,
      fontFamily: fonts.text, // Remplacez par la valeur correcte de fonts.text si nécessaire
    }
});
