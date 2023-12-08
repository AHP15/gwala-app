import { Link } from 'react-router-dom';
import { useDispatch } from '../context';
import request from '../request';
import { SET_ALERT, UNAUTHORIZED } from '../context/actions';
import styles from '../styles/Header.module.css';

const Header = () => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const response = await request(
      '/api/v1/auth/signout',
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

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>Gwala App</h1>
      </Link>

      <nav className={styles.nav}>
        <Link to="/question/new">Post Question</Link>
        <button type='button' onClick={handleClick}>signout</button>
      </nav>
    </header>
  );
};

export default Header;
