import { HttpError } from "../errors/HttpError";
import { generateAccessToken } from "../auth/auth";

export function responseInterceptorSuccess(response) {
  return response.data;
}

export function responseInterceptorError(response) {
  // TODO: NO INTERNET CONNECTION ERROR

  const error = new HttpError(response.response);

  const isAccessTokenExpired = error.isAccessTokenExpiredError();

  if (isAccessTokenExpired) {
    const isAccessTokenAlreadyCalled = this.isAccessTokenAlreadyCalled;

    if (!isAccessTokenAlreadyCalled) {
      this.generateAccessTokenRequest = generateAccessToken();
      this.isAccessTokenAlreadyCalled = true;
    }

    return this.generateAccessTokenRequest
      .then(({ access_token: accessToken }) => {
        this.setAccessToken(accessToken);
        this.isAccessTokenAlreadyCalled = false;
        return retryCall(response, this);
      })
      .catch(() => {
        this.isAccessTokenAlreadyCalled = false;
        return Promise.reject(response.response);
      });
  }

  return Promise.reject(response.response);
}

function retryCall(error, Api) {
  const { config } = error;
  return Api.axiosInstance({
    ...config,
  });
}
