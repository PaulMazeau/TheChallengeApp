import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useUser } from '../../context/UserContext';
import { fonts } from '../../constant/fonts';

export default function ClassCard() {
    const { progress } = useUser();

    // Fonction pour générer les "sous-cartes" pour l'effet de pile
    const renderStackEffect = (index) => {
        let stack = [];
        const stackCount = 2; // Nombre de sous-cartes à afficher
        for (let i = 0; i < stackCount; i++) {
            stack.push(
                <View key={`stack-${index}-${i}`} style={[styles.stackItem, {
                    // Décale chaque "sous-carte" légèrement pour créer l'effet de pile
                    transform: [{ translateY: -i * 2 }, { translateX: i * 2 }, { rotate: `${index % 3 - 10}deg` }],
                    zIndex: -i // S'assure que les "sous-cartes" restent sous la carte principale
                }]} />
            );
        }
        return stack;
    };

    return (
        <View style={styles.container}>
            {progress.map((item, index) => (
                <View key={index} style={[styles.progressItem, { transform: [{ rotate: `${index % 3 - 1}deg` }] }]}>
                    {/* Affiche l'effet de pile sous chaque carte */}
                    {renderStackEffect(index)}
                    <View style={styles.topCard}>
                        <Text style={styles.score}>{item.lastScore}/10</Text>
                        <Text style={styles.repetition}>{item.repeatDone} répétitions</Text>
                    </View>
                    <View style={styles.bottomCard}>
                        <Text style={styles.class}>{item.className}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        marginTop: 12,
    },
    progressItem: {
        backgroundColor: 'black',
        borderRadius: 4,
        width: 92,
        height: 92,
        marginBottom: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Important pour le positionnement des "sous-cartes"
    },
    stackItem: {
        position: 'absolute',
        width: 92,
        height: 92,
        backgroundColor: 'black',
        borderRadius: 4,
    },
    topCard: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 28,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    score: {
        color: 'white',
        fontSize: 16,
        fontFamily: fonts.text,
        marginBottom: 4,
    },
    repetition: {
        color: 'white',
        fontFamily: fonts.text,
        fontSize: 12,
    },
    class: {
        color: 'black',
        fontFamily: fonts.text,
        fontSize: 16,
    },
});
