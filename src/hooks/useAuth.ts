import { useEffect } from 'react';
import { useAppState } from '../context';
import { useNavigate } from 'react-router-dom';
import { AuthType } from '../context/types';

export function useAuthEffect() {
  const auth = useAppState(state => state.auth) as AuthType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return navigate('/signin');
    }
  }, [auth, navigate]);
}

export function useUnauthEffect() {
  const auth = useAppState(state => state.auth) as AuthType;
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      return navigate('/');
    }
  }, [auth, navigate]);
}

