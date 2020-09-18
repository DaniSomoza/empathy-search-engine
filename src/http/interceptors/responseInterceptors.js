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

    // to prevent multiple calls to generate access token
    if (!isAccessTokenAlreadyCalled) {
      this.isAccessTokenAlreadyCalled = true;
      this.generateAccessTokenRequest = generateAccessToken();
    }

    return this.generateAccessTokenRequest
      .then(({ access_token: accessToken }) => {
        // we set the new access token for future calls
        this.setAccessToken(accessToken);
        this.isAccessTokenAlreadyCalled = false;

        return retryCall(response, this, accessToken);
      })
      .catch((error) => {
        this.isAccessTokenAlreadyCalled = false;
        return Promise.reject(new HttpError(error.response));
      });
  }

  return Promise.reject(error);
}

function retryCall(error, Api, newAccessToken) {
  const { config } = error;
  // retry call should be performed with the new accessToken
  const authHeader = `Bearer ${newAccessToken}`;

  return Api.axiosInstance({
    ...config,
    headers: {
      ...config.headers,
      Authorization: authHeader,
    },
  });
}
