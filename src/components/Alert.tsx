import { useEffect } from 'react';
import { useAppState, useDispatch } from '../context';
import { AlertType } from '../context/types';
import { CLEAR_ALERT } from '../context/actions';

const Alert = () => {

  const alert = useAppState(state => state.alert) as AlertType;
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.type) {
      setTimeout(() => dispatch({ type: CLEAR_ALERT }), 5000);
    }
  }, [dispatch, alert.type]);

  if (!alert.type) return null;

  return (
    <div className={alert.type}>
      {alert.message}
    </div>
  );
};

export default Alert;
