import moxios from "moxios";
import Api from "../Api";
import { HTTP_STATUS, ERROR_MESSAGES } from "../errors/HttpError";
import GENERATE_ACCESS_TOKEN_MOCK from "../../../internals/request/generateAccessToken";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const EXPIRED_TOKEN_ERROR_RESPONSE = {
  status: HTTP_STATUS.UNAUTHORIZED,
  response: {
    error: {
      status: HTTP_STATUS.UNAUTHORIZED,
      message: ERROR_MESSAGES.ACCESS_TOKEN_EXPIRED,
    },
  },
};

describe("Api Tests", () => {
  beforeEach(() => {
    moxios.install(Api.axiosInstance);
    Api.setAccessToken("ACCESS_TOKEN");
  });

  afterEach(() => {
    moxios.uninstall(Api.axiosInstance);
  });

  it("Should set access token in API", async () => {
    Api.setAccessToken("ACCESS_TOKEN");

    expect(Api.axiosInstance.defaults.headers.common["Authorization"]).toEqual(
      "Bearer ACCESS_TOKEN"
    );
  });

  it("Refresh Token Flow", async (done) => {
    const refreshTokenUrl = `${BACKEND_URL}/api/token`;

    Api.setAccessToken("EXPIRED_ACCESS_TOKEN");

    moxios.stubRequest(refreshTokenUrl, {
      status: HTTP_STATUS.OK,
      response: GENERATE_ACCESS_TOKEN_MOCK,
    });

    const request = Api.get("/test");

    moxios.wait(() => {
      const expiredTokenRequest = moxios.requests.mostRecent();
      expiredTokenRequest.respondWith(EXPIRED_TOKEN_ERROR_RESPONSE).then(() => {
        const validTokenRequest = moxios.requests.mostRecent();
        // retry call should be performed with new accessToken
        expect(validTokenRequest.headers.Authorization).toEqual(
          "Bearer ACCESS_TOKEN"
        );
        validTokenRequest.respondWith({
          status: HTTP_STATUS.OK,
          response: {},
        });
      });
    });

    request.then(() => {
      // new access token should be set for future calls
      expect(
        Api.axiosInstance.defaults.headers.common["Authorization"]
      ).toEqual("Bearer ACCESS_TOKEN");
      done();
    });
  });
});
