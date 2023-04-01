import jwt_decode from "jwt-decode";

// Redux reducer for authentication state
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const LOGOUT = "LOGOUT";

var initialState = { isLoggedIn: false, user: null };

//var user = gettoken;
var user = '';
var token = '';

if (user) {
  var user = jwt_decode(token);
  user = { name: user.unique_name, id: user.nameid, email: user.email, image: user.image };

  initialState = { isLoggedIn: true, user };
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
      console.log("test redux")
      return state;
  }
};