import JwtDecoder from '../../utils/jwtDecoder';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux reducer for authentication state
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const LOGOUT = "LOGOUT";

const getData = async () => await AsyncStorage.getItem('StudentPlannerToken');

export const AuthReducer = async (state, action) => {
  let initialState = {};
  const token = await getData();

  if (token) { 
    const user = JwtDecoder.GetUserInfo(token);
    initialState = { isLoggedIn: true, user };
  }
  else {
    initialState = { isLoggedIn: false, user: null };
  }
  
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
      return state || initialState;
  }
};