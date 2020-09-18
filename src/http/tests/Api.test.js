import Api from "../Api";
import GENERATE_ACCESS_TOKEN_MOCK from "../../../internals/request/generateAccessToken";
import { generateAccessToken } from "../auth/auth";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const TOKEN_SECRET = process.env.REACT_APP_TOKEN_SECRET;

describe("Api Tests", () => {
  it("generate Access Token Request", async () => {
    const request = jest
      .spyOn(Api, "post")
      .mockImplementation(
        () => new Promise((resolve) => resolve(GENERATE_ACCESS_TOKEN_MOCK))
      );

    generateAccessToken.mockRestore();

    const { access_token: accessToken } = await generateAccessToken();

    const url = `${BACKEND_URL}/api/token`;

    const authHeader = `Basic ${TOKEN_SECRET}`;
    const payload = "grant_type=client_credentials";

    const config = {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    expect(request).toHaveBeenCalledWith(url, payload, config);

    expect(accessToken).toEqual(GENERATE_ACCESS_TOKEN_MOCK.access_token);
  });
});
