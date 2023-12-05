import { useState } from 'react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import { useUnauthEffect } from '../hooks/useAuth';
import { useDispatch } from '../context';
import { SET_ALERT, SET_PROFILE } from '../context/actions';
import request from '../request';
import styles from '../styles/Form.module.css';


type SigninStateType = {
  email: string,
  password: string,
}

const Signin = () => {
  useUnauthEffect();

  const [state, setState] = useState<SigninStateType>({
    email: '',
    password: ''
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

    if (!state.email || !state.password) return;

    const response = await request('/auth/signin', {
      method: 'post',
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.success) {
      dispatch({ type: SET_PROFILE, payload: response.data.user });
    } else {
      dispatch({ type: SET_ALERT, payload: { type: 'error', message: response.error } });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <Input
        label="Email"
        options={{
          id: 'signin_email',
          type: 'email',
          name: 'email',
          placeholder: 'Type your email',
          value: state.email,
          onChange: handleChange,
          required: true,
        }}
      />
      <Input
        label="Password"
        options={{
          id: 'signin_password',
          type: 'password',
          name: 'password',
          placeholder: 'Type your password',
          value: state.password,
          onChange: handleChange,
          required: true,
        }}
      />
      <button type='submit'>Sign in</button>
      <Link className={styles.link} to='/signup'>signup</Link>
      <Link className={styles.link} to='/password/forgot'>Forgot password?</Link>
    </form>
  );
};

export default Signin;
