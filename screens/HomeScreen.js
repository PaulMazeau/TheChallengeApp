import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useUser } from '../context/UserContext';
import ChallengeCardStack from '../component/HomePage/ChallengeCardStack';

export default function HomeScreen() {
  const { profile } = useUser();

  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
      <Text>Bienvenue {profile.FirstName} {profile.LastName}</Text> 
      <ChallengeCardStack/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
