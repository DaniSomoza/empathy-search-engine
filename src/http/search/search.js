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
  const artistCategory = "artist";
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${artistCategory}`;
  return Api.get(url);
}

export function searchTracks(query) {
  const tracksCategory = "track";
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${tracksCategory}`;
  return Api.get(url);
}

export function searchAlbums(query) {
  const albumsCategory = "album";
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${albumsCategory}`;
  return Api.get(url);
}
