const MOCK_REQUEST_ENABLED = Cypress.env("MOCK_REQUEST_ENABLED") === true; // create env var if want automation test

Cypress.Commands.add("mockRequest", (httpRequest) => {
  if (MOCK_REQUEST_ENABLED) {
    cy.route(httpRequest);
  }
});
