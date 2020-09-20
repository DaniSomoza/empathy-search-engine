import Api from "../Api";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

export function getTrack(trackId) {
  const url = `${BASE_URL}${API_VERSION}/tracks/${trackId}`;
  return Api.get(url);
}
