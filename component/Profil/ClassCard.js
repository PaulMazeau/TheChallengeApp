import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useUser } from '../../context/UserContext';
import { fonts } from '../../constant/fonts';
import { useTheme } from '../../hooks/useTheme';

export default function ClassCard() {
    const { progress } = useUser();
    const theme = useTheme();
    const styles = getStyles(theme);

    const renderStackEffect = (index) => {
        let stack = [];
        const stackCount = 2;
        for (let i = 0; i < stackCount; i++) {
            stack.push(
                <View key={`stack-${index}-${i}`} style={[styles.stackItem, {
                    transform: [{ translateY: -i * 2 }, { translateX: i * 2 }, { rotate: `${index % 3 - 10}deg` }],
                    zIndex: -i
                }]} />
            );
        }
        return stack;
    };

    return (
        <View style={styles.container}>
            {progress.length > 0 ? (
                progress.map((item, index) => (
                    <View key={index} style={[styles.progressItem, { transform: [{ rotate: `${index % 3 - 1}deg` }] }]}>
                        {renderStackEffect(index)}
                        <View style={styles.topCard}>
                            <Text style={styles.score}>{item.lastScore}/10</Text>
                            <Text style={styles.repetition}>{item.repeatDone} répétitions</Text>
                        </View>
                        <View style={styles.bottomCard}>
                            <Text style={styles.class} numberOfLines={1} ellipsizeMode='tail'>{item.className}</Text>
                        </View>
                    </View>
                ))
            ) : (
                // Affichez ce Text lorsque l'utilisateur n'a pas encore de progression
                <Text style={styles.noProgressText}>Pas encore de progression</Text>
            )}
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        marginTop: 12,
    },
    progressItem: {
        backgroundColor: theme.reverseBgColor,
        borderRadius: 4,
        width: 92,
        height: 92,
        marginBottom: 40,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    stackItem: {
        position: 'absolute',
        width: 92,
        height: 92,
        backgroundColor: theme.reverseBgColor,
        borderRadius: 4,
    },
    topCard: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
    },
    bottomCard: {
        backgroundColor: theme.BgColor,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 28,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    score: {
        color: theme.reverseTextColor,
        fontSize: 16,
        fontFamily: fonts.text,
        marginBottom: 4,
    },
    repetition: {
        color: theme.reverseTextColor,
        fontFamily: fonts.text,
        fontSize: 12,
    },
    class: {
        color: theme.textColor,
        fontFamily: fonts.text,
        fontSize: 16,
    },
    noProgressText: {
        color: theme.textColor,
        fontSize: 16,
        fontFamily: fonts.text,
        textAlign: 'center',
        marginTop: 20,
    },
});
