import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg'; // Importez SvgUri
import { ref, getDownloadURL } from 'firebase/storage';
import { FB_STORE } from '../../firebaseconfig';

export default function Badges() {
    const [badgeUrls, setBadgeUrls] = useState([]);

    useEffect(() => {
        const fetchBadges = async () => {
            const badgeNames = ['Badge_10_quizz.svg', 'Badge_20_quizz.svg', 'Badge_30_quizz.svg', 'Badge_50_quizz.svg', 'Badge_100_quizz.svg', 'Badge_150_quizz.svg', 'Badge_365_quizz.svg',];
            const urls = await Promise.all(badgeNames.map(async (name) => {
                try {
                    const badgeRef = ref(FB_STORE, `Badges/${name}`);
                    return await getDownloadURL(badgeRef);
                } catch (error) {
                    console.error('Erreur de chargement des badges:', error);
                    return null;
                }
            }));
            setBadgeUrls(urls.filter(url => url)); // Filtre pour éliminer les valeurs nulles
        };

        fetchBadges();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {badgeUrls.map((url, index) => (
                    <View key={index} style={styles.badgeContainer}>
                        {/* Utilisez SvgUri pour afficher le SVG */}
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
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 36,
    },
    badgeContainer: {
        marginRight: 10,
        width: 127, // Vous pouvez ajuster la largeur et la hauteur comme nécessaire
        height: 179,
    },
    // Pas besoin de style pour badge puisqu'on utilise SvgUri
});
