import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TabBarStackComponent from './component/Navigation/TabBarStack';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <TabBarStackComponent />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
