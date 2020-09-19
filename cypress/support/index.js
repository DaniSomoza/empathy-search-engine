/* eslint-disable no-undef */
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
import "./mock-commands";
import GENERATE_ACCESS_TOKEN_MOCK from "../../internals/request/generateAccessToken";
import SEARCH_ALL_MOCK from "../../internals/request/searchAll";
import SEARCH_TRACKS_MOCK from "../../internals/request/searchTracks";
import SEARCH_ARTISTS_MOCK from "../../internals/request/searchArtists";
import SEARCH_ALBUMS_MOCK from "../../internals/request/searchAlbums";

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
    url: "**/search?q=test query&type=album,artist,track",
    response: SEARCH_ALL_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/search?q=test query&type=album",
    response: SEARCH_ALBUMS_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/search?q=test query&type=track",
    response: SEARCH_TRACKS_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/search?q=test query&type=artist",
    response: SEARCH_ARTISTS_MOCK,
    status: 200,
  });

  cy.mockRequest({
    method: "GET",
    url: "**/search?q=test query&type=album",
    response: SEARCH_ALBUMS_MOCK,
    status: 200,
  });
});
