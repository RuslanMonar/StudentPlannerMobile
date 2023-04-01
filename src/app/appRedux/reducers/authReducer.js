import JwtDecoder from '../../utils/jwtDecoder';

// Redux reducer for authentication state
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const LOGOUT = "LOGOUT";

//var user = gettoken;
var user = '';
var token = '';

if (user) {
  var user = JwtDecoder.GetUserInfo(token);
  initialState = { isLoggedIn: true, user };
}
else {
  initialState = { isLoggedIn: false, user: null };
}

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};