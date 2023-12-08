import { useState } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import { useUnauthEffect } from '../hooks/useAuth';
import request from '../request';
import { useDispatch } from '../context';
import { SET_ALERT } from '../context/actions';
import styles from '../styles/Form.module.css';

const ForgotPassword = () => {

  useUnauthEffect();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) return;

    const response = await request(
      '/api/v1/auth/password/forgot',
      {
        method: 'post',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch({
      type: SET_ALERT,
      payload: {
        type: response.success ? 'notificatioon' : 'error',
        message: response.success ? response.data.message : response.error
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Forgot Password</h1>
      <Input
        label="Email"
        options={{
          id: 'signin_email',
          type: 'email',
          name: 'email',
          placeholder: 'Type your email',
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
        }}
      />
      <button type="submit">submit</button>
      <Link className={styles.link} to='/signin'>signin</Link>
    </form>
  );
};

export default ForgotPassword;
