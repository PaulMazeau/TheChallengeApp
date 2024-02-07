import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnswerCard from './AnswerCard';
import { useQuiz } from '../../context/ClassContext';

export default function AnswerCardStack({ options = [], selectedAnswer, isAnswerCorrect }) {
  const { submitAnswer } = useQuiz();
  
  const handleSelect = (optionIndex) => {
    submitAnswer(optionIndex);
  };

  return (
    <View style={styles.page}>
      {options.map((option, index) => (
        <AnswerCard 
          key={index} 
          option={option} 
          onSelect={handleSelect} 
          index={index} 
          selectedAnswer={selectedAnswer} 
          isAnswerCorrect={isAnswerCorrect} 
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    page: {
        minHeight: 40,
        width: '100%',
        marginVertical: 24,
    }
});
