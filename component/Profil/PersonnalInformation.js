import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useUser } from '../../context/UserContext';
import { ref, getDownloadURL } from 'firebase/storage';
import { FB_STORE } from '../../firebaseconfig';
import { fonts } from '../../constant/fonts';
import { colors } from '../../constant/colors';

export default function PersonalInformation() {
  const { profile } = useUser();
  const currentYear = new Date().getFullYear();
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePicUrl = async () => {
      const staticImageName = 'ProfilPicture.jpg'; // Remplacez par le chemin/nom de fichier exact de votre image
      const picRef = ref(FB_STORE, staticImageName);
      const url = await getDownloadURL(picRef);
      setProfilePicUrl(url);
    };

    fetchProfilePicUrl();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.yearContainer}>
        <Text style={styles.yearText}>{currentYear}</Text>
      </View>
      {/* La View suivante agit comme un wrapper pour votre Image pour lui permettre de se superposer sur l'année */}
      <View style={styles.profilePicWrapper}>
        {profilePicUrl && (
          <Image source={{ uri: profilePicUrl }} style={styles.profilePic} />
        )}
      </View>
      <Text style={styles.identity}>{profile.FirstName} {profile.LastName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  identity: {
    fontSize: 20,
    fontFamily: fonts.title,
    paddingTop: 60,
  },
  container: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20
  },
  profilePicWrapper: {
    position: 'absolute',
    bottom: 35,
    zIndex: 5,
  },
  profilePic: {
    width: 100, 
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'black', 
  },
  yearContainer: {
    alignItems: 'center',
    backgroundColor: colors.Black,
    width: '100%',
    padding: 16,
  },
  yearText: {
    fontFamily: fonts.title,
    fontSize: 120,
    color: 'white',
    // marginBottom: -10, 
  },
});
