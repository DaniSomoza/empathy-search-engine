import Api from "../Api";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

export function getAlbum(albumId) {
  const url = `${BASE_URL}${API_VERSION}/albums/${albumId}`;
  return Api.get(url);
}
