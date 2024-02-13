import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../assets/icons/Home.svg';
import Profile from '../../assets/icons/Profile.svg';
import Browse from '../../assets/icons/Browse.svg';
import BrowseScreen from '../../screens/BrowseScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import HomeScreen from '../../screens/HomeScreen';
import { useTheme } from '../../hooks/useTheme';
// Importez Platform d'Expo
import { Platform } from 'expo-modules-core';

const Tab = createBottomTabNavigator();

export default function MainStack() {
    const theme = useTheme();
    
    // Déterminez si l'app s'exécute sur le web
    const isWeb = Platform.OS === 'web';

    return (
        <Tab.Navigator 
            initialRouteName={"HomeScreen"}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: theme.reverseBgColor,
                    display: isWeb ? "none" : "flex", // Cachez la tabBar sur le web
                    padding: 20
                },
            }}
        >
            <Tab.Screen 
                name="HomeScreen" 
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Home stroke={theme.reverseTextColor} width={24} height={24} />,
                }} 
            />
            <Tab.Screen 
                name="BrowseScreen" 
                component={BrowseScreen}
                options={{
                    tabBarIcon: () => <Browse stroke={theme.reverseTextColor} width={24} height={24} />,
                }} 
            />
            <Tab.Screen 
                name="ProfileScreen" 
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <Profile stroke={theme.reverseTextColor} width={24} height={24} />,
                }} 
            />
        </Tab.Navigator>
    );
}
