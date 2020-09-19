import "@testing-library/jest-dom/extend-expect";
import { configure, cleanup } from "@testing-library/react";
import * as authEndpoints from "./http/auth/auth";
import * as searchEndpoints from "./http/search/search";
import GENERATE_ACCESS_TOKEN_MOCK from "../internals/request/generateAccessToken";
import SEARCH_ALL_MOCK from "../internals/request/searchAll";
import SEARCH_ARTISTS_MOCK from "../internals/request/searchArtists";
import SEARCH_TRACKS_MOCK from "../internals/request/searchTracks";
import SEARCH_ALBUMS_MOCK from "../internals/request/searchAlbums";

configure({ testIdAttribute: "id" });

afterAll(() => {
  restoreAllMockRequest();
});

afterEach(cleanup);

beforeEach(mockAllRequestsByDefault);

afterEach(clearAllMockRequest);

export let spiedEndpoints = {};

function mockAllRequestsByDefault() {
  spiedEndpoints.generateAccessToken = jest
    .spyOn(authEndpoints, "generateAccessToken")
    .mockImplementation(
      () => new Promise((resolve) => resolve(GENERATE_ACCESS_TOKEN_MOCK))
    );

  spiedEndpoints.searchAll = jest
    .spyOn(searchEndpoints, "searchAll")
    .mockImplementation(
      () => new Promise((resolve) => resolve(SEARCH_ALL_MOCK))
    );

  spiedEndpoints.searchArtists = jest
    .spyOn(searchEndpoints, "searchArtists")
    .mockImplementation(
      () => new Promise((resolve) => resolve(SEARCH_ARTISTS_MOCK))
    );

  spiedEndpoints.searchTracks = jest
    .spyOn(searchEndpoints, "searchTracks")
    .mockImplementation(
      () => new Promise((resolve) => resolve(SEARCH_TRACKS_MOCK))
    );

  spiedEndpoints.searchAlbums = jest
    .spyOn(searchEndpoints, "searchAlbums")
    .mockImplementation(
      () => new Promise((resolve) => resolve(SEARCH_ALBUMS_MOCK))
    );
}

function clearAllMockRequest() {
  Object.keys(spiedEndpoints).forEach((endpoint) =>
    spiedEndpoints[endpoint].mockClear()
  );
}

function restoreAllMockRequest() {
  Object.keys(spiedEndpoints).forEach((endpoint) =>
    spiedEndpoints[endpoint].mockRestore()
  );
}

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});
