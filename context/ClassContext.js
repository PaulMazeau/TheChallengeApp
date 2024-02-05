import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { useUser } from './UserContext';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [currentClass, setCurrentClass] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  const { profile } = useUser();

  useEffect(() => {
    const loadClassOfTheDay = async () => {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'

      const classesRef = collection(FB_DB, 'class');
      const q = query(classesRef, where('repeatDate', 'array-contains', dateString));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const classDoc = querySnapshot.docs[0];
        setCurrentClass({
          id: classDoc.id,
          ...classDoc.data(),
        });

        const questionsRef = collection(FB_DB, `class/${classDoc.id}/questions`);
        const questionsSnapshot = await getDocs(questionsRef);
        setQuestions(questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
      setIsLoading(false);
    };

    loadClassOfTheDay();
  }, []);

  useEffect(() => {
    // Assurez-vous que toutes les questions ont été répondues avant d'appeler updateProgress
    if (responses.length === questions.length && questions.length > 0) {
      updateProgress();
    }
  }, [responses, questions.length]);

  const submitAnswer = (selectedOptionIndex) => {
    const isCorrect = selectedOptionIndex === questions[currentQuestionIndex].answer;
    console.log(`Réponse à la question ${questions[currentQuestionIndex].id}:`, isCorrect ? "Correcte" : "Incorrecte");

    setResponses(prevResponses => [
      ...prevResponses,
      { questionId: questions[currentQuestionIndex].id, selectedOption: selectedOptionIndex, isCorrect }
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    }
  };

  const updateProgress = async () => {
    const correctAnswersCount = responses.filter(response => response.isCorrect).length;
    const progressDocRef = doc(FB_DB, 'users', profile.uid, 'progress', currentClass.id);

    try {
      const progressDoc = await getDoc(progressDocRef);
      if (progressDoc.exists()) {
        await updateDoc(progressDocRef, {
          lastScore: correctAnswersCount,
          repeatDone: (progressDoc.data().repeatDone || 0) + 1,
        });
      } else {
        await setDoc(progressDocRef, {
          classID: currentClass.id,
          lastScore: correctAnswersCount,
          repeatDone: 1,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du progrès :", error);
    }

    setResponses([]);
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = () => setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  const prevQuestion = () => setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));

  const value = {
    currentClass,
    currentQuestion: questions[currentQuestionIndex],
    submitAnswer,
    nextQuestion,
    prevQuestion,
    isLoading,
    totalQuestions: questions.length,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContext;
