describe("Search", () => {
  it("Should search by all categories", () => {
    cy.visit("http://localhost:3000/empathy-search-engine/");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const artistItemId = "#gallery-item-1";
    const albumItemId = "#gallery-item-2";
    const trackItemId = "#gallery-item-3";

    cy.get(artistItemId).should("be.visible");
    cy.get(albumItemId).should("be.visible");
    cy.get(trackItemId).should("be.visible");
  });

  it("Should search by artist", () => {
    cy.visit("http://localhost:3000/empathy-search-engine/");

    cy.get("#category-dropdown").select("artist");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const artistItemId = "#gallery-item-1";

    cy.get(artistItemId).should("be.visible");
  });

  it("Should search by album", () => {
    cy.visit("http://localhost:3000/empathy-search-engine/");

    cy.get("#category-dropdown").select("album");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const albumItemId = "#gallery-item-2";

    cy.get(albumItemId).should("be.visible");
  });

  it("Should search by track", () => {
    cy.visit("http://localhost:3000/empathy-search-engine/");

    cy.get("#category-dropdown").select("track");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const trackItemId = "#gallery-item-3";

    cy.get(trackItemId).should("be.visible");
  });

  it("Should remove all items if user clears the search input", () => {
    cy.visit("http://localhost:3000/empathy-search-engine/");

    cy.get("#search-query-input").type("test query");

    const artistItemId = "#gallery-item-1";
    const albumItemId = "#gallery-item-2";
    const trackItemId = "#gallery-item-3";

    cy.get(artistItemId).should("be.visible");
    cy.get(albumItemId).should("be.visible");
    cy.get(trackItemId).should("be.visible");

    cy.get("#search-query-input").clear().should("have.value", "");

    cy.get(artistItemId).should("not.exist");
    cy.get(albumItemId).should("not.exist");
    cy.get(trackItemId).should("not.exist");
  });
});
