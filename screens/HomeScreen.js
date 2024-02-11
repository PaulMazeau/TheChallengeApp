import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuiz } from '../context/ClassContext';
import GridBackground from '../component/HomePage/GridBackground';
import AnswerCardStack from '../component/Reusable/AnswerCardStack';
import Question from '../component/Reusable/Question';
import Header from '../component/Reusable/Header';
import { useTheme } from '../hooks/useTheme';

export default function HomeScreen() {
  const { currentClass, currentQuestion, isLoading, selectedAnswer, isAnswerCorrect } = useQuiz();
  const theme = useTheme();
  const styles = getStyles(theme); // Création des styles dynamiquement en fonction du thème

  return (
    <View style={styles.page}>
      <GridBackground />
      <Header />
      <View style={styles.container}>
        {isLoading ? (
          <Text>Chargement...</Text>
        ) : currentClass ? (
          <>
            <Question 
              title={currentClass?.title}
              question={currentQuestion?.question}
            />
        <AnswerCardStack
          options={currentQuestion?.options}
          selectedAnswer={selectedAnswer}
          isAnswerCorrect={isAnswerCorrect}
          correctAnswerIndex={currentQuestion?.answer} // Passez l'index de la bonne réponse ici
        />
          </>
        ) : (
          <Text style={styles.noQuizText}>Aucun quizz à faire pour le moment. Revenez plus tard !</Text>
        )}
      </View>
    </View>
  );
}


const getStyles = (theme) => StyleSheet.create({  
  page: {
    flex: 1,
    backgroundColor: 'transparent', 
  },
  container: {
    flex: 1,
    marginHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noQuizText: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    color: theme.textColor,
  },
});
