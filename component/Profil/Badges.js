import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useUser } from '../../context/UserContext';
import { ref, getDownloadURL } from 'firebase/storage';
import { FB_STORE } from '../../firebaseconfig';

export default function Badges() {
    const { progress } = useUser(); // Utilisez le hook useUser pour accéder aux données de progression
    const [badgeUrls, setBadgeUrls] = useState([]);

    useEffect(() => {
        const totalRepeatDone = progress.reduce((total, current) => total + current.repeatDone, 0);

        // Déterminez quels badges débloquer en fonction de totalRepeatDone
        const badgeNames = [];
        if (totalRepeatDone >= 10) badgeNames.push('Badge_10_quizz.svg');
        if (totalRepeatDone >= 20) badgeNames.push('Badge_20_quizz.svg');
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
            setBadgeUrls(urls.filter(url => url)); // Filtrez pour éliminer les valeurs nulles
        };

        fetchBadges();
    }, [progress]); // Ajoutez progress comme dépendance pour recalculer à chaque mise à jour

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.scrollViewContent}
            >
                {badgeUrls.map((url, index) => (
                    <View key={index} style={styles.badgeContainer}>
                        <SvgUri
                            width="100%"
                            height="100%"
                            uri={url}
                        />
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
