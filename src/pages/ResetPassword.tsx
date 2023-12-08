import { useState } from 'react';
import Input from '../components/Input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUnauthEffect } from '../hooks/useAuth';
import request from '../request';
import { useDispatch } from '../context';
import { SET_ALERT } from '../context/actions';
import styles from '../styles/Form.module.css';

const ResetPassword = () => {
  useUnauthEffect();

  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
  });
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.password || !state.confirmPassword) return;

    const response = await request(
      `/api/v1/auth/password/reset/${token}`,
      {
        method: 'put',
        body: JSON.stringify(state),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.success) {
      navigate('/signin');
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Reset Password</h1>
      <Input
        label="Password"
        options={{
          id: 'reset_password',
          type: 'password',
          name: 'password',
          placeholder: 'Type your password',
          value: state.password,
          onChange: handleChange,
          required: true,
        }}
      />
      <Input
        label="Confirm Password"
        options={{
          id: 'reset_confirm_password',
          type: 'password',
          name: 'confirmPassword',
          placeholder: 'Confirm your password',
          value: state.confirmPassword,
          onChange: handleChange,
          required: true,
        }}
      />
      <button type='submit'>Reset Password</button>
      <Link className={styles.link} to='/signin'>signin</Link>
    </form>
  );
}

export default ResetPassword;
