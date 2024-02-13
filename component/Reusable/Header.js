import React from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Assurez-vous d'importer useNavigation
import { fonts } from '../../constant/fonts';
import { useTheme } from '../../hooks/useTheme';
import ProfileIcon from '../../assets/icons/Profile.svg'; // Assurez-vous d'avoir un icône de profil SVG

export default function Header() {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation(); // Utilisez le hook useNavigation pour la navigation

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Challenge</Text>
        {Platform.OS === 'web' && (
          <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('ProfileScreen')}>
            <ProfileIcon stroke={theme.textColor} width={24} height={24} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'android' ? 25 : -25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  logo: {
    fontSize: 32,
    fontFamily: fonts.title,
    color: theme.textColor,
  },
  profileIcon: {
    position: 'absolute',
    right: 20, // Ajustez selon le besoin
  },
});
