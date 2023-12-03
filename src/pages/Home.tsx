import { useState } from 'react'
import '../App.css'
import { useAuthEffect } from '../hooks/useAuth'
import request from '../request'
import { useDispatch } from '../context'
import { SET_ALERT, UNAUTHORIZED } from '../context/actions'
import Input from '../components/Input'
import { Link } from 'react-router-dom'


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

  const handleClick = async () => {
    const response = await request(
      '/auth/signout',
      {
        method: 'get',
      }
    );
    if (response.success) {
      dispatch({ type: UNAUTHORIZED });
    } else {
      dispatch({ type: SET_ALERT, payload: { type: 'error', message: response.error } });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!location) return;

    const response = await request(
      `/question/${location}`,
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
      <form onSubmit={handleSubmit}>
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

      {
        questions.map(question => (
          <Link to={`/question/${question.id}`}>
            <div>
              <h2>{question.title}</h2>
              <p>{question.content}</p>
              <p>{question.location}</p>
              <div>
                <p>{question.likes}</p>
                <p>{question.answers}</p>
              </div>
            </div>
          </Link>
        ))
      }
      <button type='button' onClick={handleClick}>signout</button>
    </>
  )
}

export default Home;
