import { useParams } from 'react-router-dom';
import { useAuthEffect } from '../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import request from '../request';
import { useDispatch } from '../context';
import { SET_ALERT } from '../context/actions';
import Answer from '../components/Answer';
import CreateAnswer from '../components/CreateAnswer';
import Pending from '../components/Pending';
import Header from '../components/Header';
import styles from '../styles/Question.module.css';

export type AnswerType = {
  id: string,
  content: string,
  author: string,
};

type QuestionType = {
  id: string,
  title: string,
  content: string,
  location: string,
  author: string,
  answers: AnswerType[],
  likes: number,
};

const Question = () => {
  useAuthEffect();

  const [question, setQuestion] = useState<QuestionType>({
    id: '',
    title: '',
    content: '',
    location: '',
    author: '',
    answers: [],
    likes: 0
  });

  const dispatch = useDispatch();

  const { id } = useParams();

  const getQuestion = useCallback(async () => {
    const response = await request(
      `/api/v1/question/${id}`,
      {
        method: 'get'
      }
    );

    if (response.success) {
      setQuestion(response.data.question);
    } else {
      dispatch({ type: SET_ALERT, payload: { message: response.error, type: 'error' } });
    }
  }, [id, dispatch]);

  const addAnswer = useCallback(
    (answer: AnswerType) => setQuestion((prev => ({ ...prev, answers: [...prev.answers, answer] })))
    , []);

  useEffect(() => { getQuestion(); }, [getQuestion]);

  if (!question.id) return <Pending />;

  return (
    <>
      <Header />
      <div className={styles.question}>
        <h1 className={styles.question_title}>{question.title}</h1>
        <p>{question.content}</p>
        <p>{question.location}</p>
        <CreateAnswer questionId={question.id} callback={addAnswer} />
        <div>
          {question.answers.map((answer, index) => (
            <Answer key={index} answer={answer} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Question;
