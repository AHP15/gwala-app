import { useState } from 'react'
import '../App.css'
import { useAuthEffect } from '../hooks/useAuth'
import request from '../request'
import { useDispatch } from '../context'
import { SET_ALERT } from '../context/actions'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import styles from '../styles/Home.module.css';


type Question = {
  id: string,
  title: string,
  content: string,
  location: string,
  answers: number,
  likes: number
};

function Home() {
  useAuthEffect();

  const [location, setLocation] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!location) return;

    const response = await request(
      `/api/v1/questions/${location}`,
      {
        method: 'get',
      }
    );

    if (response.success) {
      setQuestions(response.data.questions);
    } else {
      dispatch({ type: SET_ALERT, payload: { type: 'error', message: response.error } });
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label='Location'
          options={{
            type: 'text',
            id: 'find_location',
            name: 'location',
            placeholder: 'Enter Location',
            value: location,
            onChange: (e) => setLocation(e.target.value),
            required: true
          }}
        />
        <button type='submit'>Find Questions</button>
      </form>

      <div className={styles.card_container}>
        {
          questions.map(question => (
            <Link to={`/question/details/${question.id}`} className={styles.card_link}>
              <div className={styles.card}>
                <h2>{question.title}</h2>
                <p>{question.content}</p>
                <p>{question.location}</p>
                <div className={styles.card_interactions}>
                  <div>likes: {question.likes}</div>
                  <div>answers: {question.answers}</div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </>
  )
}

export default Home;
