import axios from 'axios';

// The base URL for our backend API, stored in .env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Axios request interceptor.
 * This function is called before any request is sent. It checks if we have an
 * access token in local storage and, if so, adds it to the Authorization header.
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

/**
 * Axios response interceptor for handling token refresh.
 * This function is called when a response is received. It specifically looks for
 * 401 Unauthorized errors, which indicate an expired access token.
 */
apiClient.interceptors.response.use(
    (response) => response, // If the response is successful, just return it.
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is a 401 and we haven't already retried the request.
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark that we've retried this request.

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error('No refresh token available');

                // Request new tokens using the refresh token.
                const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                // Store the new tokens.
                localStorage.setItem('accessToken', data.accessToken);

                // Update the header of the original request with the new access token.
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                // Retry the original failed request.
                return apiClient(originalRequest);

            } catch (refreshError) {
                // If the refresh token is invalid, logout the user.
                console.error('Session expired. Please log in again.');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                // Redirect to login page.
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default apiClient;