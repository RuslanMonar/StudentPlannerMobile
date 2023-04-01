import AuthGateway from '../gateways/authGateway';
import { SaveUserAction } from '../appRedux/actionsCreator/authActions';
import JwtDecoder from '../utils/jwtDecoder';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = (Email, Password) => async (dispatch) => {
    return AuthGateway.SignIn(Email, Password).then(
        async (response) => {
            var user = JwtDecoder.GetUserInfo(response.data.token);
            dispatch(SaveUserAction({ user }));
            await AsyncStorage.setItem("StudentPlannerToken", response.data.token);
            return Promise.resolve();
        }
    );
};

const SignUp = (Email, Password) => async (dispatch) => {
    return AuthGateway.SignUp(Email, Password).then(
        async (response) => {
            var user = JwtDecoder.GetUserInfo(response.data.token);
            dispatch(SaveUserAction({ user }));
            await AsyncStorage.setItem("StudentPlannerToken", response.data.token);
            return Promise.resolve();
        }
    );
};


export default {
    SignUp,
    SignIn
};