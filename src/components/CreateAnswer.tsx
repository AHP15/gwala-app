import React, { useState } from 'react';
import Input from './Input';
import { useAppState, useDispatch } from '../context';
import { SET_ALERT } from '../context/actions';
import request from '../request';
import { AnswerType } from '../pages/Question';
import { UserType } from '../context/types';

const CreateAnswer = React.memo((
  { questionId, callback }
    : { questionId: string, callback: (answer: AnswerType) => void }
) => {

  const [content, setContent] = useState<string>('');
  const user = useAppState(state => state.user) as UserType;
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!content) return;

    const response = await request(
      '/api/v1/answer/new',
      {
        method: 'POST',
        body: JSON.stringify({ content, question: questionId }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.success) {
      setContent('');
      callback({
        ...response.data.answer,
        author: user.email,
      });
    }

    dispatch({
      type: SET_ALERT,
      payload: {
        type: response.success ? 'success' : 'error',
        message: response.success ? 'Answer created' : response.error
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Content"
        options={{
          type: 'text',
          id: 'answer_content',
          name: 'content',
          placeholder: 'Type your answer here',
          value: content,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value),
          required: true
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}, () => true); // props will never change for the lifetime of the component

export default CreateAnswer;
