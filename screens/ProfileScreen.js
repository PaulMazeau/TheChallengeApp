import React, {  } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import ClassCard from '../component/Profil/ClassCard';
import Badges from '../component/Profil/Badges';
import PersonnalInformation from '../component/Profil/PersonnalInformation';
import { fonts } from '../constant/fonts';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1, // S'assure que le ScrollView utilise la hauteur du contenu
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: 24,
    fontFamily: fonts.title,
    paddingHorizontal: 16,
  },
});
