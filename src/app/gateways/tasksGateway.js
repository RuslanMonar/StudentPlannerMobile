import { api } from '../shared/config/axios';

const CreateTask = async (data) => {
    const apiInstance = await api();
    return apiInstance.post("ProjectTask", data)
        .then(response => response, error => Promise.reject(ErrorBuilder(error)));
};

const GetTasks = async () => {
    const apiInstance = await api();
    return apiInstance.get("ProjectTask")
        .then(response => response, error => Promise.reject(ErrorBuilder(error)));
};

const ErrorBuilder = (error) => {
    const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();
    const code = error.response?.status;
    return { message, code };
};


export default {
    CreateTask,
    GetTasks
};