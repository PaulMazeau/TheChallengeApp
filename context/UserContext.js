import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    let unsubscribeFromUser = () => {};
    let unsubscribeFromProgress = () => {};

    if (currentUser) {
      const userProfileRef = doc(FB_DB, 'users', currentUser.uid);

      unsubscribeFromUser = onSnapshot(userProfileRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setProfile({
            ...userData,
            uid: currentUser.uid
          });
        } else {
          console.log("No such user!");
        }
      });

      const progressRef = collection(FB_DB, 'users', currentUser.uid, 'progress');
      unsubscribeFromProgress = onSnapshot(progressRef, (snapshot) => {
        const progressData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProgress(progressData);
      });
    }

    return () => {
      unsubscribeFromUser();
      unsubscribeFromProgress();
    };
  }, [currentUser]);

  const value = {
    profile,
    progress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
