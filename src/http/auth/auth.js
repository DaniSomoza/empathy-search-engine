import Api from "../Api";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const TOKEN_SECRET = process.env.REACT_APP_TOKEN_SECRET;

// TODO: MOVE THIS FLOW TO BACK-TO-BACK

export function generateAccessToken() {
  const url = `${BACKEND_URL}/api/token`;

  const authHeader = `Basic ${TOKEN_SECRET}`;
  const payload = "grant_type=client_credentials";

  const config = {
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  return Api.post(url, payload, config);
}
