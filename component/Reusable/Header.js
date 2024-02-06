import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';

export default function Header() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'BricolageGrotesque': require('../../assets/fonts/BricolageGrotesque.ttf'),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View/>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Challenge</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'android' ? 25 : -25,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    fontSize: 32,
    fontFamily: 'BricolageGrotesque',
    color: 'black',
  },
});
