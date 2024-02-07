import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { useUser } from './UserContext';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [currentClasses, setCurrentClasses] = useState([]);
  const [currentClassIndex, setCurrentClassIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Initialisé à false pour commencer le chargement
  const [responses, setResponses] = useState([]);
  const { profile } = useUser();

  useEffect(() => {
    const loadClassesOfTheDay = async () => {
      setIsLoading(true); // Commencer le chargement
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];

      const classesRef = collection(FB_DB, 'class');
      const q = query(classesRef, where('repeatDate', 'array-contains', dateString));
      const querySnapshot = await getDocs(q);
      const classesData = [];

      for (const classDoc of querySnapshot.docs) {
        const classData = {
          id: classDoc.id,
          ...classDoc.data(),
        };

        const progressDocRef = doc(FB_DB, 'users', profile.uid, 'progress', classData.id);
        const progressDoc = await getDoc(progressDocRef);

        if (!progressDoc.exists() || !(progressDoc.data().completedDates && progressDoc.data().completedDates.includes(dateString))) {
          classesData.push(classData);
        }
      }

      setCurrentClasses(classesData);
      setCurrentClassIndex(0);
      if (classesData.length > 0) {
        await loadQuestionsForCurrentClass(classesData[0]);
      }
      setIsLoading(false); // Fin du chargement
    };

    loadClassesOfTheDay();
  }, [profile.uid]);

  const submitAnswer = async (selectedOptionIndex) => {
    const isCorrect = selectedOptionIndex === questions[currentQuestionIndex].answer;
    console.log(`Réponse à la question ${questions[currentQuestionIndex].id}:`, isCorrect ? "Correcte" : "Incorrecte");

    setResponses(prevResponses => [
      ...prevResponses,
      { questionId: questions[currentQuestionIndex].id, selectedOption: selectedOptionIndex, isCorrect }
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      await updateProgress(currentClassIndex === currentClasses.length - 1);
    }
  };

  const loadQuestionsForCurrentClass = async (classData) => {
    const questionsRef = collection(FB_DB, `class/${classData.id}/questions`);
    const questionsSnapshot = await getDocs(questionsRef);
    setQuestions(questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setCurrentQuestionIndex(0); // Réinitialiser l'index de question pour la nouvelle classe
  };

  const updateProgress = async (isLastQuiz) => {
    const today = new Date().toISOString().split('T')[0];
    const correctAnswersCount = responses.filter(response => response.isCorrect).length;

    const progressDocRef = doc(FB_DB, 'users', profile.uid, 'progress', currentClasses[currentClassIndex]?.id);

    try {
      const progressDoc = await getDoc(progressDocRef);
      if (progressDoc.exists()) {
        let completedDates = progressDoc.data().completedDates || [];
        if (!completedDates.includes(today)) {
          completedDates.push(today);
        }

        await updateDoc(progressDocRef, {
          lastScore: correctAnswersCount,
          repeatDone: (progressDoc.data().repeatDone || 0) + 1,
          completedDates: completedDates,
        });
      } else {
        await setDoc(progressDocRef, {
          classID: currentClasses[currentClassIndex]?.id,
          className: currentClasses[currentClassIndex]?.title,
          lastScore: correctAnswersCount,
          repeatDone: 1,
          completedDates: [today],
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du progrès :", error);
    }

    setResponses([]);

    if (!isLastQuiz) {
      const nextClassIndex = currentClassIndex + 1;
      if (nextClassIndex < currentClasses.length) {
        setCurrentClassIndex(nextClassIndex);
        await loadQuestionsForCurrentClass(currentClasses[nextClassIndex]);
      } else {
        console.log('Tous les quizz pour aujourdhui sont terminés.');
        // Ici, vous pouvez réinitialiser l'état ou gérer la fin de tous les quizz.
        setIsLoading(false); // Assurez-vous que l'utilisateur sait que le chargement est terminé
        setCurrentClasses([]);
        setCurrentClassIndex(0);
      }
    } else {
      console.log('Tous les quizz pour aujourdhui sont terminés.');
      setIsLoading(false); // Assurez-vous que l'utilisateur sait que le chargement est terminé
      setCurrentClasses([]);
      setCurrentClassIndex(0);
    }
  };

  const nextQuestion = () => setCurrentQuestionIndex(prevIndex => prevIndex + 1);

  const value = {
    currentClass: currentClasses[currentClassIndex],
    currentQuestion: questions[currentQuestionIndex],
    submitAnswer,
    isLoading,
    totalQuestions: questions.length,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContext;
