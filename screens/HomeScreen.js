import React from 'react';
import { View, StyleSheet } from 'react-native';
import GridBackground from '../component/HomePage/GridBackground';
import ChallengeCard from '../component/Reusable/ChallengeCard';
import AnswerCardStack from '../component/Reusable/AnswerCardStack';

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <GridBackground/>
      <View style={styles.container}>
        <ChallengeCard/>
        <AnswerCardStack/>
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
