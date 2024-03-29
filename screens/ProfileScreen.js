import React, {  } from 'react';
import { StyleSheet, ScrollView, Text, Button, Platform } from 'react-native';
import ClassCard from '../component/Profil/ClassCard';
import Badges from '../component/Profil/Badges';
import PersonnalInformation from '../component/Profil/PersonnalInformation';
import { fonts } from '../constant/fonts';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../hooks/useTheme';
import DisconnectButton from '../component/Profil/DisconnectButton';

export default function ProfileScreen({navigation}) {
  const theme = useTheme();
  const styles = getStyles(theme); // Création des styles dynamiquement en fonction du thème

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light" />
      <PersonnalInformation />
      <Text style={styles.subTitle}>Badges</Text>
      <Badges />
      <Text style={styles.subTitle}>Leçon</Text>
      <ClassCard />
      {Platform.OS === 'web' && (
      <Button title="Retourner aux quizz" onPress={() => navigation.goBack()}></Button>
      )}
      <DisconnectButton/>
    </ScrollView>
  );
}

const getStyles = (theme) => StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: theme.BgColor,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: theme.BgColor,
  },
  subTitle: {
    fontSize: 24,
    fontFamily: fonts.title,
    paddingHorizontal: 16,
    color: theme.textColor,
  },
});
