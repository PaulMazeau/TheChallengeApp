import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuiz } from '../context/ClassContext';
import GridBackground from '../component/HomePage/GridBackground';
import AnswerCardStack from '../component/Reusable/AnswerCardStack';
import Question from '../component/Reusable/Question';

export default function HomeScreen() {
  const { currentClass, currentQuestion } = useQuiz();

  // Affichage conditionnel en fonction de la présence d'un quizz
  return (
    <View style={styles.page}>
      <GridBackground/>
      <View style={styles.container}>
        {currentClass ? (
          <>
            <Question 
              title={currentClass?.title}
              question={currentQuestion?.question}
            />
            <AnswerCardStack options={currentQuestion?.options}/>
          </>
        ) : (
          // Afficher un message si aucun quizz n'est disponible
          <Text style={styles.noQuizText}>Aucun quizz à faire pour le moment. Revenez plus tard !</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  noQuizText: { // Style pour le message indiquant l'absence de quizz
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
  }
});
