import {
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { Action, AppState, StateType } from './types';
import request from '../request';
import {
  CLEAR_ALERT,
  SET_ALERT,
  SET_PROFILE,
  UNAUTHORIZED
} from './actions';
import App from '../App';


const initialState: StateType = {
  auth: {
    pending: true,
    isAuthenticated: false,
  },
  user: {
    id: '',
    email: ''
  },
  alert: {
    type: '',
    message: ''
  }
};

const StateContext = createContext<AppState>({ state: initialState });

export function useAppState(selector: (state: StateType) => unknown) {
  return selector(useContext(StateContext).state);
}

export function useDispatch(): React.Dispatch<Action> {
  return useContext(StateContext).dispatch as React.Dispatch<Action>;
}

function reducer(state: StateType, action: Action): StateType {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        user: {
          id: action.payload.id,
          email: action.payload.email
        },
        auth: {
          pending: false,
          isAuthenticated: true
        }
      };
    case UNAUTHORIZED:
      return {
        ...initialState,
        auth: {
          pending: false,
          isAuthenticated: false
        }
      };
    case SET_ALERT:
      return {
        ...state,
        alert: {
          type: action.payload.type,
          message: action.payload.message
        }
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alert: {
          type: '',
          message: ''
        }
      };
    default:
      return state;
  }
}

type AppComponent = React.ReactElement<unknown, React.JSXElementConstructor<typeof App>>;
export default function StateProvider({ children }: { children: AppComponent }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getProfile() {
    const response = await request(
      '/user/profile',
      {
        method: 'get'
      }
    );
    if (response.success) {
      dispatch({ type: SET_PROFILE, payload: response.data?.user });
    } else {
      dispatch({ type: UNAUTHORIZED });
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
} 