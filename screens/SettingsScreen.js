import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { FB_AUTH } from '../firebaseconfig';
import { signOut } from 'firebase/auth';

export default function SettingsScreen() {
    const navigation = useNavigation();

    const handleSignOut = () => {
      signOut(FB_AUTH)
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        })
        .catch((error) => {
          console.error('Erreur lors de la déconnexion:', error);
        });
    };
  return (
    <View>
        <Button
        title="Déconnexion"
        onPress={handleSignOut}
      />
    </View>
  )
}

const styles = StyleSheet.create({})