// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "@testing-library/cypress/add-commands";
import "@cypress/code-coverage/support";
import "./mock-commands";
import GENERATE_ACCESS_TOKEN_MOCK from "../../internals/request/generateAccessToken";
import SEARCH_ALL_MOCK from "../../internals/request/searchAll";
import SEARCH_TRACKS_MOCK from "../../internals/request/searchTracks";
import SEARCH_ARTISTS_MOCK from "../../internals/request/searchArtists";
import SEARCH_ALBUMS_MOCK from "../../internals/request/searchAlbums";
import GET_TRACK_MOCK from "../../internals/request/getTrack";
import GET_ALBUM_MOCK from "../../internals/request/getAlbum";
import GET_ARTIST_MOCK from "../../internals/request/getArtist";

// Alternatively you can use CommonJS syntax:
// require('./commands')

const MOCK_REQUEST_ENABLED = Cypress.env("MOCK_REQUEST_ENABLED") === true; // create env var if want automation test

beforeEach(() => {
  if (MOCK_REQUEST_ENABLED) {
    cy.server();
  }

  cy.mockRequest({
    method: "POST",
    url: "**/api/token",
    response: GENERATE_ACCESS_TOKEN_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/search?q=test query&type=album,artist,track&offset=0&limit=15",
    response: SEARCH_ALL_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/search?q=test query&type=album&offset=0&limit=30",
    response: SEARCH_ALBUMS_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/search?q=test query&type=track&offset=0&limit=30",
    response: SEARCH_TRACKS_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/search?q=test query&type=artist&offset=0&limit=30",
    response: SEARCH_ARTISTS_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/v1/tracks/3",
    response: GET_TRACK_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/v1/albums/2",
    response: GET_ALBUM_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/v1/artists/1",
    response: GET_ARTIST_MOCK,
    status: 200,
  });
});
