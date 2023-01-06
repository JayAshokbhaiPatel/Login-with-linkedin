import { createContext, useReducer } from 'react';

interface PropTypes {
  children: JSX.Element;
}

interface InitialState {
  data: any;
}

interface Context extends InitialState {
  provider: string;
  login: (data: any) => void;
}

type ACTION_TYPE = {
  type: 'LOGIN';
  payload: {
    data: any;
  };
};

const initialState: InitialState = {
  data: {},
};

const handlers = {
  LOGIN: (state: InitialState, action: ACTION_TYPE) => {
    const { data } = action.payload;
    return { ...state, data: data };
  },
};

const reducer = (state: InitialState, action: ACTION_TYPE) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<Context>({} as Context);

function AuthProvider({ children }: PropTypes) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state: ', state);

  const login = (data: any) => {
    console.log('data: ', data);
    dispatch({ type: 'LOGIN', payload: { data: data } });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        provider: 'linkedin-oauth2',
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
