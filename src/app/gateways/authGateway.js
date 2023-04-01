import { api } from '../shared/config/axios';

const SignIn = (email, password) => {
    let data = { email, password };

    return api().post("Auth/SignIn", data)
        .then(
            response => {
                return response;
            },
            (error) => {
                return Promise.reject(ErrorBuilder(error));
            }
        );

};

const SignUp = (email, password) => (dispatch) => {
    let data = { email, password };

    return api().post("Auth/SignUp", data)
        .then(
            response => response,
            (error) => {
                return Promise.reject(ErrorBuilder(error));
            }
        );
};

const ErrorBuilder = (error) => {
    const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
    const code = error.response.status;
    return { message, code };
};


export default {
    SignUp,
    SignIn
};