import { api } from '../shared/config/axios';

const CreateProject = async (title, color, folderId) => {
    let data = { title, color, folderId };
    const apiInstance = await api();
    return apiInstance.post("Projects", data)
        .then(response => response, error => Promise.reject(ErrorBuilder(error)));
};

const GetProjects = async () => {
    const apiInstance = await api();
    return apiInstance.get("Projects")
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
    CreateProject,
    GetProjects
};