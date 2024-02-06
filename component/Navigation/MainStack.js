import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../assets/icons/Home.svg';
import Profile from '../../assets/icons/Profile.svg';
import Browse from '../../assets/icons/Browse.svg';
import BrowseScreen from '../../screens/BrowseScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import HomeScreen from '../../screens/HomeScreen';
import { colors } from '../../constant/colors';

const Tab = createBottomTabNavigator();

export default function MainStack() {
    return (
        <Tab.Navigator 
            initialRouteName={"HomeScreen"}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.Black,
                    display: "flex",
                    padding: 20
                },
            }}
        >
            <Tab.Screen 
                name="HomeScreen" 
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Home stroke={'white'} width={24} height={24} />,
                }} 
            />
            <Tab.Screen 
                name="BrowseScreen" 
                component={BrowseScreen}
                options={{
                    tabBarIcon: () => <Browse stroke={'white'} width={24} height={24} />,
                }} 
            />
            <Tab.Screen 
                name="ProfileScreen" 
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <Profile stroke={'white'} width={24} height={24} />,
                }} 
            />
        </Tab.Navigator>
    );
}