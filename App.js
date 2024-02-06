import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainStack from './component/Navigation/MainStack';
import AuthStack from './component/Navigation/AuthStack';
import { UserProvider } from './context/UserContext';
import { QuizProvider } from './context/ClassContext';
import useFonts from './hooks/useFonts';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {currentUser ? (
        <Stack.Screen 
          name="Main" 
          component={MainStack} 
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAsync = async () => {
      await useFonts();
      setFontsLoaded(true);
    };

    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Chargement des polices...</Text></View>;
  }

  return (
    <AuthProvider>
      <UserProvider>
        <QuizProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
        </QuizProvider>
      </UserProvider>
    </AuthProvider>
  );
}
