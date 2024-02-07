import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function BrowseScreen() {
  const theme = useTheme();
  const styles = getStyles(theme); // Création des styles dynamiquement en fonction du thème

  return (
      <View style={styles.container}>
            <Text style={styles.text}>BrowseScreen</Text>
      </View>
  );
}

const getStyles = (theme) => StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: theme.BgColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: theme.textColor,
  }
});
