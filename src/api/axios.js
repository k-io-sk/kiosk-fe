import axios from 'axios';

/** 토큰이 필요 없는 기본 API 인스턴스 */
const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

/** 토큰이 필요한 인증 API 인스턴스 */
const privateApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30000,
});

/** 요청 인터셉터: private 요청마다 토큰 추가 */
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

/** 응답 인터셉터: 토큰 만료 시 재발급 시도 */
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await publicApi.post('/auth/refresh', { refreshToken });
        const newToken = res.data.token;

        localStorage.setItem('token', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return privateApi(originalRequest);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

/** 통합 서비스 객체 */
export const APIService = {
  public: {
    get: (url, config = {}) => publicApi.get(url, config).then((res) => res.data),
    post: (url, data = {}, config = {}) => publicApi.post(url, data, config).then((res) => res.data),
  },
  private: {
    get: (url, config = {}) => privateApi.get(url, config).then((res) => res.data),
    post: (url, data = {}, config = {}) => privateApi.post(url, data, config).then((res) => res.data),
    put: (url, data = {}, config = {}) => privateApi.put(url, data, config).then((res) => res.data),
    patch: (url, data = {}, config = {}) => privateApi.patch(url, data, config).then((res) => res.data),
    delete: (url, config = {}) => privateApi.delete(url, config).then((res) => res.data),
  },
};

export default { public: publicApi, private: privateApi };
