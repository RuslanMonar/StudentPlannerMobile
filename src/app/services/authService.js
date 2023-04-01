import AuthGateway from '../gateways/authGateway';
import { SaveUserAction } from '../appRedux/actionsCreator/authActions';
import JwtDecoder from '../utils/jwtDecoder';

const SignIn = (Email, Password) => (dispatch) => {
    return AuthGateway.SignIn(Email, Password).then(
        (response) => {
            var user = JwtDecoder.GetUserInfo(response.data.token);
            dispatch(SaveUserAction({ user }));
            return Promise.resolve();
        }
    );
};

const SignUp = (Email, Password) => (dispatch) => {
    return AuthGateway.SignUp(Email, Password).then(
        (response) => {
            var user = JwtDecoder.GetUserInfo(response.data.token);
            dispatch(SaveUserAction({ user }));
            return Promise.resolve();
        }
    );
};


export default {
    SignUp,
    SignIn
};