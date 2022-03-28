import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptors handle update of the Axios on every request.
instance.interceptors.request.use(
  async (config) => {
    const token = await JSON.parse(localStorage.getItem('token') || '{}');
    if (token && token.accessToken) config.headers!.Authorization = `Bearer ${token.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;


// *****************
// AXIOS
// Interceptors, used solution: https://github.com/axios/axios/issues/1383
// Another good example, more thurow: https://webera.blog/implement-refresh-token-with-jwt-in-react-app-using-axios-1910087c3d7
//******************