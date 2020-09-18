import axios from "axios";
import {
  responseInterceptorSuccess,
  responseInterceptorError,
} from "./interceptors/responseInterceptors";

const RETRY_ATTEMPTS = 1; // no retry configured
const NETWORK_TIMEOUT = 10000; // 10 seconds timeout

class Api {
  constructor() {
    this.axiosInstance = axios.create({
      retry: RETRY_ATTEMPTS,
      timeout: NETWORK_TIMEOUT,
      headers: {
        common: {
          "Content-Type": "application/json",
        },
      },
    });

    this.axiosInstance.interceptors.response.use(
      responseInterceptorSuccess.bind(this),
      responseInterceptorError.bind(this)
    );

    this.isAccessTokenAlreadyCalled = false;
  }

  setAccessToken(accessToken) {
    const authHeader = `Bearer ${accessToken}`;
    this.axiosInstance.defaults.headers.common["Authorization"] = authHeader;
  }

  get(url, config) {
    return this.axiosInstance.get(url, config);
  }

  post(url, data, config) {
    return this.axiosInstance.post(url, data, config);
  }
}

export default new Api();
