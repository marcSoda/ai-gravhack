import axios from 'axios';

// Configure Axios to include CSRF tokens with every request
const axiosInstance = axios.create({
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
  withCredentials: true,
});

export default axiosInstance;
