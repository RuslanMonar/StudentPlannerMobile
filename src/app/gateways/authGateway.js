import { api } from '../shared/config/axios';

const SignIn = async (email, password) => {
    let data = { email, password };
    const apiInstance = await api();
    return apiInstance.post("Auth/SignIn", data)
        .then(response => response, error => Promise.reject(ErrorBuilder(error)));

};

const SignUp = async (email, password) => async (dispatch) => {
    let data = { email, password };
    const apiInstance = await api();
    return apiInstance.post("Auth/SignUp", data)
        .then(response => response, error => Promise.reject(ErrorBuilder(error)));
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