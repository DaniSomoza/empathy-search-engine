class HttpError {
  constructor(axiosError = { data: {}, config: {} }) {
    const {
      data = {
        error: {
          message: "",
        },
      },
      config = {
        url: "",
      },
      status,
    } = axiosError;

    this.config = config;
    this.message = data.error.message;
    this.error = data.error;
    this.status = status;
    this.url = config.url;
  }

  getError() {
    return this.error;
  }

  isAccessTokenExpiredError() {
    return (
      this.message === ACCESS_TOKEN_EXPIRED_ERROR_MESSAGE &&
      this.status === HTTP_STATUS.UNAUTHORIZED
    );
  }
}

const ACCESS_TOKEN_EXPIRED_ERROR_MESSAGE = "The access token expired";

const ERROR_MESSAGES = {
  ACCESS_TOKEN_EXPIRED: ACCESS_TOKEN_EXPIRED_ERROR_MESSAGE,
};

const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

export { HttpError, ERROR_MESSAGES };
