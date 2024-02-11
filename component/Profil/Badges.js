import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, Platform, Image } from 'react-native'; // Assurez-vous d'inclure Platform ici
import { SvgUri } from 'react-native-svg';
import { useUser } from '../../context/UserContext';
import { ref, getDownloadURL } from 'firebase/storage';
import { FB_STORE } from '../../firebaseconfig';

const SvgImage = ({ uri, style }) => {
    if (Platform.OS === 'web') {
      // Utilisation d'une balise img pour le web
      return <img src={uri} style={style} alt="SVG Badge" />;
    }
    // Utilisation de SvgUri pour les plateformes natives
    return <SvgUri uri={uri} width="100%" height="100%" />;
  };

export default function Badges() {
    const { progress } = useUser();
    const [badgeUrls, setBadgeUrls] = useState([]);

    useEffect(() => {
        const totalRepeatDone = progress.reduce((total, current) => total + current.repeatDone, 0);
        const badgeNames = [];
        if (totalRepeatDone >= 10) badgeNames.push('Badge_10_quizz.svg');
        if (totalRepeatDone >= 20) badgeNames.push('Badge_20_quizz.svg');
        if (totalRepeatDone >= 30) badgeNames.push('Badge_30_quizz.svg');
        if (totalRepeatDone >= 50) badgeNames.push('Badge_50_quizz.svg');
        if (totalRepeatDone >= 100) badgeNames.push('Badge_100_quizz.svg');
        if (totalRepeatDone >= 150) badgeNames.push('Badge_150_quizz.svg');
        if (totalRepeatDone >= 365) badgeNames.push('Badge_365_quizz.svg');

        // Ajoutez d'autres conditions pour les paliers de badges supplémentaires

        // Fonction pour charger les URLs des badges débloqués
        const fetchBadges = async () => {
            const urls = await Promise.all(badgeNames.map(async (name) => {
                try {
                    const badgeRef = ref(FB_STORE, `Badges/${name}`);
                    return await getDownloadURL(badgeRef);
                } catch (error) {
                    console.error('Erreur de chargement des badges:', error);
                    return null;
                }
            }));
            setBadgeUrls(urls.filter(url => url));
        };

        fetchBadges();
    }, [progress]);

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                {badgeUrls.map((url, index) => (
                    <View key={index} style={styles.badgeContainer}>
                        <SvgImage uri={url} style={{ width: '100%', height: '100%' }} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 36,
    },
    badgeContainer: {
        marginRight: 10,
        width: 127,
        height: 179,
    },
    scrollViewContent: {
        paddingHorizontal: 16,
    },
});