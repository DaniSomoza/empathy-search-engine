import Api from "../Api";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

// TODO: implement pagination

export function searchAll(query) {
  const allCategories = "album,artist,track";
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${allCategories}`;
  return Api.get(url);
}

export function searchArtists(query) {
  const allCategories = "artist";
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${allCategories}`;
  return Api.get(url);
}

export function searchTracks(query) {
  const allCategories = "track";
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${allCategories}`;
  return Api.get(url);
}

export function searchAlbums(query) {
  const allCategories = "album";
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${allCategories}`;
  return Api.get(url);
}
