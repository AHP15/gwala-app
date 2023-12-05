import { Link } from 'react-router-dom';
import { useDispatch } from '../context';
import request from '../request';
import { SET_ALERT, UNAUTHORIZED } from '../context/actions';

const Header = () => {
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

  return (
    <header>
      <Link to="/">
        <h1>Gwala App</h1>
      </Link>

      <nav>
        <Link to="/question/new">Post Question</Link>
        <button type='button' onClick={handleClick}>signout</button>
      </nav>
    </header>
  );
};

export default Header;
