import { useState } from 'react';
import Input from '../components/Input';
import { useAuthEffect } from '../hooks/useAuth';
import request from '../request';
import { useDispatch } from '../context';
import { SET_ALERT } from '../context/actions';
import styles from '../styles/Form.module.css';
import Header from '../components/Header';

const CreateQuestion = () => {
  useAuthEffect();

  const [state, setState] = useState({
    title: '',
    content: '',
    location: '',
  });
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.title || !state.content || !state.location) return;

    const response = await request(
      '/question/new',
      {
        method: 'post',
        body: JSON.stringify(state),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.success) {
      setState({
        title: '',
        content: '',
        location: ''
      });
    }

    dispatch({
      type: SET_ALERT,
      payload: {
        type: response.success ? 'success' : 'error',
        message: response.success ? response.data.message : response.error
      }
    });
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Post Question</h1>
        <Input
          label='Title'
          options={{
            type: 'text',
            id: 'question_title',
            name: 'title',
            placeholder: 'Question title',
            value: state.title,
            onChange: handleChange,
            required: true
          }}
        />
        <Input
          label='Content'
          options={{
            type: 'text',
            id: 'question_content',
            name: 'content',
            placeholder: 'Question content',
            value: state.content,
            onChange: handleChange,
            required: true
          }}
        />
        <Input
          label='Location'
          options={{
            type: 'text',
            id: 'question_location',
            name: 'location',
            placeholder: 'Question Location',
            value: state.location,
            onChange: handleChange,
            required: true
          }}
        />
        <button type='submit'>Post Question</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
