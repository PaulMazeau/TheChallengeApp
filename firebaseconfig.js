import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, inMemoryPersistence, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROJECTID, APIKEY, AUTHDOMAIN, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from '@env';

const firebaseConfig = {
    apiKey: APIKEY || 'mock_key',
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
};

// Initialize Firebase
const FB_APP = initializeApp(firebaseConfig);

let FB_AUTH;

if (typeof document !== 'undefined') {
    // Assume web environment
    FB_AUTH = getAuth(FB_APP);
    // Optionally, you can enable persistence for web
    // auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
} else {
    // Assume React Native environment
    FB_AUTH = initializeAuth(FB_APP, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
}

const FB_DB = getFirestore(FB_APP);
const FB_STORE = getStorage(FB_APP);

// Export the initialized services
export { FB_APP, FB_AUTH, FB_DB, FB_STORE };
