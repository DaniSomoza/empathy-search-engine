import Api from "../Api";
import { searchAll, searchArtists, searchTracks, searchAlbums } from "./search";
import SEARCH_ALL_MOCK from "../../../internals/request/searchAll";
import SEARCH_ARTISTS_MOCK from "../../../internals/request/searchArtists";
import SEARCH_TRACKS_MOCK from "../../../internals/request/searchTracks";
import SEARCH_ALBUMS_MOCK from "../../../internals/request/searchAlbums";

const BASE_URL = process.env.REACT_APP_SPOTIFY_URL;

const API_VERSION = "/v1";

describe("HTTP Search Tests", () => {
  it("Should search by all categories", async () => {
    const request = jest
      .spyOn(Api, "get")
      .mockImplementation(
        () => new Promise((resolve) => resolve(SEARCH_ALL_MOCK))
      );

    searchAll.mockRestore();

    const query = "test";

    const { albums, artists, tracks } = await searchAll(query);

    const allCategories = "album,artist,track";
    const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${allCategories}`;

    expect(request).toHaveBeenCalledWith(url);

    expect(albums).toEqual(SEARCH_ALL_MOCK.albums);
    expect(artists).toEqual(SEARCH_ALL_MOCK.artists);
    expect(tracks).toEqual(SEARCH_ALL_MOCK.tracks);

    request.mockRestore();
  });

  it("Should search by artists", async () => {
    const request = jest
      .spyOn(Api, "get")
      .mockImplementation(
        () => new Promise((resolve) => resolve(SEARCH_ARTISTS_MOCK))
      );

    searchArtists.mockRestore();

    const query = "test";

    const { artists } = await searchArtists(query);

    const artistCategory = "artist";
    const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${artistCategory}`;

    expect(request).toHaveBeenCalledWith(url);

    expect(artists).toEqual(SEARCH_ARTISTS_MOCK.artists);

    request.mockRestore();
  });

  it("Should search by tracks", async () => {
    const request = jest
      .spyOn(Api, "get")
      .mockImplementation(
        () => new Promise((resolve) => resolve(SEARCH_TRACKS_MOCK))
      );

    searchTracks.mockRestore();

    const query = "test";

    const { tracks } = await searchTracks(query);

    const tracksCategory = "track";
    const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${tracksCategory}`;

    expect(request).toHaveBeenCalledWith(url);

    expect(tracks).toEqual(SEARCH_TRACKS_MOCK.tracks);

    request.mockRestore();
  });

  it("Should search by albums", async () => {
    const request = jest
      .spyOn(Api, "get")
      .mockImplementation(
        () => new Promise((resolve) => resolve(SEARCH_ALBUMS_MOCK))
      );

    searchAlbums.mockRestore();

    const query = "test";

    const { albums } = await searchAlbums(query);

    const albumsCategory = "album";
    const url = `${BASE_URL}${API_VERSION}/search?q=${query}&type=${albumsCategory}`;

    expect(request).toHaveBeenCalledWith(url);

    expect(albums).toEqual(SEARCH_ALBUMS_MOCK.albums);

    request.mockRestore();
  });
});
