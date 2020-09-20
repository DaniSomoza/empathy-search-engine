import Api from "../Api";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

export function searchAll(query, page = 1, limit = 15) {
  const allCategories = "album,artist,track";
  const offset = (page - 1) * limit;
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${allCategories}&offset=${offset}&limit=${limit}`;
  return Api.get(url);
}

export function searchArtists(query, page = 1, limit = 30) {
  const artistCategory = "artist";
  const offset = (page - 1) * limit;
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${artistCategory}&offset=${offset}&limit=${limit}`;
  return Api.get(url);
}

export function searchTracks(query, page = 1, limit = 30) {
  const tracksCategory = "track";
  const offset = (page - 1) * limit;
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${tracksCategory}&offset=${offset}&limit=${limit}`;
  return Api.get(url);
}

export function searchAlbums(query, page = 1, limit = 30) {
  const albumsCategory = "album";
  const offset = (page - 1) * limit;
  const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${albumsCategory}&offset=${offset}&limit=${limit}`;
  return Api.get(url);
}
