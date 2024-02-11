import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { fonts } from '../../constant/fonts';

export default function AnswerCard({ option, onSelect, index, selectedAnswer, isAnswerCorrect, correctAnswerIndex }) {
  const theme = useTheme();
  // Ajustez la logique de style pour inclure les conditions de sélection
  const isSelected = selectedAnswer === index;
  const isCorrectAnswer = index === correctAnswerIndex;
  const showCorrectAnswer = selectedAnswer !== null; // Une réponse a été sélectionnée
  const styles = getStyles(theme, isSelected, isAnswerCorrect, isCorrectAnswer, showCorrectAnswer);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(index)}>
      <Text style={styles.option}>{`${index + 1}. ${option}`}</Text>
    </TouchableOpacity>
  );
}

// Modifiez getStyles pour accepter selected et isCorrect
const getStyles = (theme, isSelected, isCorrect, isCorrectAnswer, showCorrectAnswer) => StyleSheet.create({
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
        backgroundColor: showCorrectAnswer ? (isCorrectAnswer ? 'green' : isSelected ? 'red' : theme.reverseBgColor) : theme.reverseBgColor,
        padding: 14,
        marginVertical: 4,
    },
    option: {
      // Assurez-vous que la couleur du texte est visible contre le fond
      color: theme.reverseTextColor,
      fontFamily: fonts.text, // Remplacez par la valeur correcte de fonts.text si nécessaire
    }
});
