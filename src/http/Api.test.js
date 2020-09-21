import moxios from "moxios";
import Api from "./Api";
import { HTTP_STATUS, ERROR_MESSAGES } from "./errors/HttpError";
import GENERATE_ACCESS_TOKEN_MOCK from "../../internals/request/generateAccessToken";
import { spiedEndpoints } from "../setupTests";

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

  it("Should set Access Token in header requests", async () => {
    Api.setAccessToken("ACCESS_TOKEN");

    expect(Api.axiosInstance.defaults.headers.common["Authorization"]).toEqual(
      "Bearer ACCESS_TOKEN"
    );
  });

  it("Should request a new Access Token if its expired", async (done) => {
    const refreshTokenUrl = `${BACKEND_URL}/api/token`;

    const generateAccessTokenSpy = jest.fn();

    Api.get(refreshTokenUrl).then(generateAccessTokenSpy);

    Api.setAccessToken("EXPIRED_ACCESS_TOKEN");

    moxios.stubRequest(refreshTokenUrl, {
      status: HTTP_STATUS.OK,
      response: GENERATE_ACCESS_TOKEN_MOCK,
    });

    const request = Api.get("/test");

    // we simulate here the response with Access Token expired
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

      expect(generateAccessTokenSpy).toHaveBeenCalled();
      expect(generateAccessTokenSpy).toHaveBeenCalledTimes(1);
      generateAccessTokenSpy.mockRestore();

      done();
    });
  });

  it("Should not call generateAccessToken endpoint if was already called", async (done) => {
    const refreshTokenUrl = `${BACKEND_URL}/api/token`;

    const generateAccessTokenSpy = jest.fn();

    Api.get(refreshTokenUrl).then(generateAccessTokenSpy);

    Api.setAccessToken("EXPIRED_ACCESS_TOKEN");

    moxios.stubRequest(refreshTokenUrl, {
      status: HTTP_STATUS.OK,
      response: GENERATE_ACCESS_TOKEN_MOCK,
    });

    Api.isAccessTokenAlreadyCalled = true;

    let resolveAccessTokenRequest;
    Api.generateAccessTokenRequest = new Promise((resolve) => {
      resolveAccessTokenRequest = () =>
        resolve({
          access_token: "ACCESS_TOKEN_JAJ",
        });
    });

    const request = Api.get("/test");

    moxios.wait(() => {
      const expiredTokenRequest = moxios.requests.mostRecent();
      expiredTokenRequest.respondWith(EXPIRED_TOKEN_ERROR_RESPONSE).then(() => {
        // we check if we are waiting for generateAccessToken
        expect(spiedEndpoints.generateAccessToken).not.toHaveBeenCalled();
        expect(
          Api.axiosInstance.defaults.headers.common["Authorization"]
        ).toEqual("Bearer EXPIRED_ACCESS_TOKEN");

        // now he simulate that generateAccessToken is finished
        moxios.stubRequest("/test", {
          status: HTTP_STATUS.OK,
          response: {},
        });
        resolveAccessTokenRequest();

        // now we check if new AccessToken is set
        request.then(() => {
          expect(
            Api.axiosInstance.defaults.headers.common["Authorization"]
          ).toEqual("Bearer ACCESS_TOKEN_JAJ");

          expect(Api.isAccessTokenAlreadyCalled).toEqual(false);
          done();
        });
      });
    });
  });

  it("Should return error when request fails", (done) => {
    moxios.stubRequest("/test", {
      status: HTTP_STATUS.BAD_REQUEST,
      response: {
        error: {
          message: "this is an error",
        },
      },
    });

    const request = Api.get("/test");
    request.catch((error) => {
      expect(error.message).toEqual("this is an error");
      expect(error.status).toEqual(HTTP_STATUS.BAD_REQUEST);
      done();
    });
  });

  it("Should return error when generateAccessCode fails", (done) => {
    spiedEndpoints.generateAccessToken.mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          expect(Api.isAccessTokenAlreadyCalled).toEqual(true);
          return reject({
            response: {
              status: HTTP_STATUS.BAD_REQUEST,
              data: {
                error: {
                  message: "this is an generateAccessToken error",
                },
              },
            },
          });
        })
    );

    moxios.stubRequest("/test", EXPIRED_TOKEN_ERROR_RESPONSE);

    const request = Api.post("/test");

    request.catch((error) => {
      expect(Api.isAccessTokenAlreadyCalled).toEqual(false);
      expect(error.message).toEqual("this is an generateAccessToken error");
      expect(error.status).toEqual(HTTP_STATUS.BAD_REQUEST);
      done();
    });
  });
});
