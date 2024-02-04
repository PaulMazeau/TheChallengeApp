import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [currentClass, setCurrentClass] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadClassOfTheDay = async () => {
      const today = new Date();
      console.log(today)
      const dateString = today.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

      const classesRef = collection(FB_DB, 'class');
      const q = query(
        classesRef,
        where('repeatDate', 'array-contains', dateString) // Utilise la chaîne de date
      );
  
      const querySnapshot = await getDocs(q);
      console.log(`Nombre de classes trouvées : ${querySnapshot.size}`);
  
      if (!querySnapshot.empty) {
        const classDoc = querySnapshot.docs[0];
        console.log("Classe du jour trouvée :", classDoc.data());
  
        setCurrentClass(classDoc.data()); // Stocke les données de la classe actuelle
  
        const questionsRef = collection(FB_DB, `class/${classDoc.id}/questions`);
        const questionsSnapshot = await getDocs(questionsRef);
        const questionsData = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Questions de la classe du jour :", questionsData);
        setQuestions(questionsData); // N'oubliez pas de mettre à jour l'état avec les questions récupérées
      }
      setIsLoading(false); // Mettre à jour l'état de chargement
    };
  
    loadClassOfTheDay();
  }, []);


  const nextQuestion = () => setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));

  const prevQuestion = () => setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));

  const currentQuestion = questions[currentQuestionIndex];

  const value = {
    currentQuestion,
    currentClass,
    nextQuestion,
    prevQuestion,
    isLoading,
    totalQuestions: questions.length,
    currentQuestionIndex,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
