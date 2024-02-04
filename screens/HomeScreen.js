import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuiz } from '../context/ClassContext';
import GridBackground from '../component/HomePage/GridBackground';
import AnswerCardStack from '../component/Reusable/AnswerCardStack';
import Question from '../component/Reusable/Question';

export default function HomeScreen() {
  const { currentClass, currentQuestion } = useQuiz();
  return (
    <View style={styles.page}>
      <GridBackground/>
      <View style={styles.container}>
        <Question 
          title={currentClass?.title}
          question={currentQuestion?.question}
        />
        <AnswerCardStack options={currentQuestion?.options}/>
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
  }
});
