import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../constant/fonts';

export default function Header() {

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
    fontFamily: fonts.title,
    color: 'black',
  },
});
