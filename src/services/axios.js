import axios from "axios"

export const publicRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 1000
});

export const privateRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 1000
});

privateRequest.interceptors.request.use(
    config => {
        const userInfo = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : '';
        if (userInfo) {
            config.headers.Authorization = `Bearer ${userInfo['token']}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

privateRequest.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error) {
        const originalRequest = error.config;
        if (error?.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const userInfo = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : '';
                if (userInfo) {
                    const {data} = await publicRequest.post('/token/refresh', null, {
                        headers: {
                            'refresh_token': userInfo['refreshToken']
                        },
                    })

                    localStorage.setItem('user_info', JSON.stringify({...userInfo, token: data['token']}))

                    originalRequest.headers.Authorization  = 'Bearer ' + data['token'];
                    return axios(originalRequest);
                } else {
                    // return Promise.reject(error);
                    throw error;
                }
            } catch (e) {
                throw error;
            }

        }
        return Promise.reject(error);
    });