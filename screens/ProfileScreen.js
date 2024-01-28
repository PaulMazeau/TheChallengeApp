import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FB_AUTH } from '../firebaseconfig';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
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
      <View style={styles.container}>
        <Text>ProfileScreen</Text>
        <Button
          title="Déconnexion"
          onPress={handleSignOut}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
