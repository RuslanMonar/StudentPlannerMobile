import {SAVE_USER_SUCCESS, LOGOUT} from "../reducers/authReducer";

export const SaveUserAction = (payload) => ({type:SAVE_USER_SUCCESS, payload})
export const LogOutAction = (payload) => ({type:LOGOUT, payload})