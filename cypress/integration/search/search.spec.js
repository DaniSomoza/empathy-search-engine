/* eslint-disable no-undef */
describe("Search", () => {
  it("Should search by all categories", () => {
    cy.visit("http://localhost:3000/");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const artistItemId = "#gallery-item-1";

    cy.get(artistItemId).should("be.visible");
    cy.get("#gallery-item-2").should("be.visible");
    cy.get("#gallery-item-3").should("be.visible");
  });

  it("Should search by artist", () => {
    cy.visit("http://localhost:3000/");

    cy.get("#category-dropdown").select("artist");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const artistItemId = "#gallery-item-1";

    cy.get(artistItemId).should("be.visible");
  });

  it("Should search by album", () => {
    cy.visit("http://localhost:3000/");

    cy.get("#category-dropdown").select("album");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const albumItemId = "#gallery-item-2";

    cy.get(albumItemId).should("be.visible");
  });

  it("Should search by track", () => {
    cy.visit("http://localhost:3000/");

    cy.get("#category-dropdown").select("track");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const trackItemId = "#gallery-item-3";

    cy.get(trackItemId).should("be.visible");
  });
});
