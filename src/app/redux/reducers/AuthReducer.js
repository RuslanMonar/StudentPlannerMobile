// Redux reducer for authentication state
const initialState = {
  token: null,
  error: null,
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { token: action.payload, error: null };
    case 'LOGIN_FAILURE':
      return { token: null, error: action.payload };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};