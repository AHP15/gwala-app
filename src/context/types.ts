
export type AuthType = {
  pending: boolean,
  isAuthenticated: boolean
};

export type UserType = {
  id: string,
  email: string
};

export type AlertType = {
  type: string,
  message: string
};

export type StateType = {
  auth: AuthType,
  user: UserType,
  alert: AlertType
  // new state can be added
};

export type Action = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any,
  type: string,
};

export type AppState = {
  state: StateType,
  dispatch?: React.Dispatch<Action>,
};
