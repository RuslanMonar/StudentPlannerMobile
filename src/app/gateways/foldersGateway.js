import { api } from '../shared/config/axios';

const CreateFolder = (title, color) => {
    let data = { title, color };
    return api().post("Folders", data)
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
    CreateFolder
};