import axios from "services/axios.customize"

export const registerPage = (fullName: string, password: string, email: string, phone: string) => {
    const baseURL = "api/v1/user/register"
    return axios.post<IBackendRes<IRegister>>(baseURL, { fullName, email, password, phone });
}

export const loginPage = (username: string, password: string) => {
    const baseURL = "api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(baseURL, { username, password }, {
        headers: {
            delay: 5000
        }
    });
}

export const fetchAccountAPI = () => {
    const baseURL = "api/v1/auth/account";
    return axios.get<IBackendRes<IFetchAccount>>(baseURL, {
        headers: {
            delay: 3000
        }
    });
}

export const logoutAPI = () => {
    const baseURL = "api/v1/auth/logout";
    return axios.post<IBackendRes<IRegister>>(baseURL);
}

export const getUserAPI = () => {
    const baseURL = "api/v1/user?current=1&pageSize=5";
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(baseURL);
}