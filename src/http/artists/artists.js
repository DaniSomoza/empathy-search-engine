import Api from "../Api";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

export function getArtist(artistId) {
  const url = `${BASE_URL}${API_VERSION}/artists/${artistId}`;
  return Api.get(url);
}
