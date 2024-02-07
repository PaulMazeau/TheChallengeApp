import React, {  } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ClassCard from '../component/Profil/ClassCard';
import Badges from '../component/Profil/Badges';
import PersonnalInformation from '../component/Profil/PersonnalInformation';
import { fonts } from '../constant/fonts';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <PersonnalInformation/>
      <Text style={styles.subTitle}>Badges</Text>
      <Badges/>
      <Text style={styles.subTitle}>Leçon</Text>
      <ClassCard/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: 24,
    fontFamily: fonts.title,
    paddingHorizontal: 16,
  },
});
