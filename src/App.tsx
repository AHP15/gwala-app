import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Signup from './pages/Signup'
import Signin from './pages/signin'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import CreateQuestion from './pages/CreateQuestion'
import Question from './pages/Question'
import Alert from './components/Alert'
import Home from './pages/Home';
import { useAppState } from './context';
import { AuthType } from './context/types';
import Pending from './components/Pending';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/password/forgot',
    element: <ForgotPassword />
  },
  {
    path: '/password/reset/:token',
    element: <ResetPassword />
  },
  {
    path: '/question/new',
    element: <CreateQuestion />
  },
  {
    path: '/question/details/:id',
    element: <Question />
  }
]);

const App = () => {
  const auth = useAppState(state => state.auth) as AuthType;

  if (auth.pending) {
    return <Pending />
  }

  return (
    <>
      <RouterProvider router={router} />
      <Alert />
    </>
  );
};

export default App;
