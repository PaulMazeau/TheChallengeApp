import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../constant/fonts';
import { useTheme } from '../../hooks/useTheme';

export default function Header() {
  const theme = useTheme();
  const styles = getStyles(theme); // Création des styles dynamiquement en fonction du thème

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Challenge</Text>
    </SafeAreaView>
  );
}

const getStyles = (theme) => StyleSheet.create({  
  container: {
    paddingBottom: Platform.OS === 'android' ? 25 : -25,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    fontSize: 32,
    fontFamily: fonts.title,
    color: theme.textColor,
  },
});
