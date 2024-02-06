import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FB_AUTH } from '../firebaseconfig';
import { signOut } from 'firebase/auth';
import ClassCard from '../component/Profil/ClassCard';
import Badges from '../component/Profil/Badges';
import PersonnalInformation from '../component/Profil/PersonnalInformation';
import { fonts } from '../constant/fonts';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const navigation = useNavigation();

  // const handleSignOut = () => {
  //   signOut(FB_AUTH)
  //     .then(() => {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'Auth' }],
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de la déconnexion:', error);
  //     });
  // };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <PersonnalInformation/>
      <Text style={styles.subTitle}>Badges</Text>
      <Badges/>
      <Text style={styles.subTitle}>Leçon</Text>
      <ClassCard/>
      {/* <Button
        title="Déconnexion"
        onPress={handleSignOut}
      /> */}
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
