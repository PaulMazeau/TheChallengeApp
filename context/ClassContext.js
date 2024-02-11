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
    const [isLoading, setIsLoading] = useState(false);
    const [responses, setResponses] = useState([]);
    const { profile } = useUser();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    useEffect(() => {
        const loadClassesOfTheDay = async () => {
            setIsLoading(true);
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
            setIsLoading(false);
        };

        loadClassesOfTheDay();
    }, [profile.uid]);

    const loadQuestionsForCurrentClass = async (classData) => {
        const questionsRef = collection(FB_DB, `class/${classData.id}/questions`);
        const questionsSnapshot = await getDocs(questionsRef);
        setQuestions(questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setCurrentQuestionIndex(0);
        setResponses([]); // S'assurer que les réponses sont réinitialisées lors du chargement de nouvelles questions
    };

    const nextQuestion = () => setCurrentQuestionIndex(prevIndex => prevIndex + 1);

    const submitAnswer = async (selectedOptionIndex) => {
      const isCorrect = selectedOptionIndex === (questions[currentQuestionIndex].answer - 1);
      setSelectedAnswer(selectedOptionIndex);
        setIsAnswerCorrect(isCorrect);

        // Ajoutez la réponse à l'état des réponses
        setResponses(prevResponses => [...prevResponses, { isCorrect }]);

        setTimeout(async () => {
          if (currentQuestionIndex < questions.length - 1) {
            nextQuestion();
            }
            setSelectedAnswer(null);
        }, 2000);
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

        // Réinitialiser les réponses pour le prochain quiz
        setResponses([]);

        if (!isLastQuiz) {
            const nextClassIndex = currentClassIndex + 1;
            if (nextClassIndex < currentClasses.length) {
                setCurrentClassIndex(nextClassIndex);
                await loadQuestionsForCurrentClass(currentClasses[nextClassIndex]);
            } else {
                console.log('Tous les quizz pour aujourdhui sont terminés.');
                setIsLoading(false);
                setCurrentClasses([]);
                setCurrentClassIndex(0);
            }
        } else {
            console.log('Tous les quizz pour aujourdhui sont terminés.');
            setIsLoading(false);
            setCurrentClasses([]);
            setCurrentClassIndex(0);
        }
    };

    useEffect(() => {
      // Ce useEffect sera déclenché après chaque mise à jour de `responses`
      if (responses.length === questions.length && questions.length > 0) {
          // Si toutes les questions ont été répondues
          updateProgress(currentClassIndex === currentClasses.length - 1);
      }
  }, [responses, questions.length, currentClassIndex, currentClasses.length]);


    const value = {
        currentClass: currentClasses[currentClassIndex],
        currentQuestion: questions[currentQuestionIndex],
        submitAnswer,
        isLoading,
        totalQuestions: questions.length,
        selectedAnswer,
        isAnswerCorrect,
        setSelectedAnswer,
        setIsAnswerCorrect,
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContext;
