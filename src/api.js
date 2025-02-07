import axios from "axios";

const api = axios.create({
    baseURL: "https://shopping-list.test/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async(error) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            const refreshToken = localStorage.getItem("refresh_token");

            if (!refreshToken) {
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/";
                return Promise.reject(error);
            }

            try {
                const { data } = await axios.post("https://shopping-list.test/api/auth/refresh", {
                    refresh_token: refreshToken,
                });

                localStorage.setItem("token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);

                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;