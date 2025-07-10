import axios from 'axios';

// Configure Axios to include CSRF tokens with every request
const axiosInstance = axios.create({
  xsrfHeaderName: "X-CSRFTOKEN",
  xsrfCookieName: "csrftoken",
});

export default axiosInstance;
