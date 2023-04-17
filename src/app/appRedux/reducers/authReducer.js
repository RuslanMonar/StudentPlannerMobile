import JwtDecoder from '../../utils/jwtDecoder';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux reducer for authentication state
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const LOGOUT = "LOGOUT";

const getData = async () => await AsyncStorage.getItem('StudentPlannerToken');

async function logOut() {
  try {
    await AsyncStorage.removeItem('StudentPlannerToken');
    console.log(`Successfully removed item with key StudentPlannerToken`);
  } catch (error) {
    console.log(`Error removing item with key StudentPlannerToken: ${error}`);
  }
}

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
      console.log("redux log out called")
      await logOut();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state || initialState;
  }
};