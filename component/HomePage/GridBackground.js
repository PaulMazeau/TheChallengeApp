import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

// Composant GridBackground
const GridBackground = () => {
  const gridSize = 60; // La taille des cellules du cadrillage
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const numVerticalLines = Math.ceil(screenWidth / gridSize);
  const numHorizontalLines = Math.ceil(screenHeight / gridSize);
  const theme = useTheme();
  const styles = getStyles(theme); // Création des styles dynamiquement en fonction du thème

  return (
    <View style={styles.gridContainer}>
      {Array.from({ length: numVerticalLines }).map((_, index) => (
        <View key={`vline-${index}`} style={[styles.line, styles.verticalLine, { left: gridSize * index }]} />
      ))}
      {Array.from({ length: numHorizontalLines }).map((_, index) => (
        <View key={`hline-${index}`} style={[styles.line, styles.horizontalLine, { top: gridSize * index }]} />
      ))}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({  
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, 
    backgroundColor: theme.BgColor,
  },
  line: {
    position: 'absolute',
    backgroundColor: theme.lineColor, // Couleur et transparence des lignes
  },
  verticalLine: {
    width: 1, // Épaisseur des lignes verticales
    height: '100%',
  },
  horizontalLine: {
    height: 1, // Épaisseur des lignes horizontales
    width: '100%',
  },
});

export default GridBackground;
