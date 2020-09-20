describe("Artists Page", () => {
  it("Should go to Artists Page and see details", () => {
    cy.visit("http://localhost:3000/empathy-search-engine");

    cy.get("#category-dropdown").select("artist");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const artistItemId = "#gallery-item-1";

    cy.get(artistItemId).should("be.visible");

    cy.get(artistItemId).click();

    cy.get("#artist-info-name").contains("Name: Artist 1.");
    // cy.get("#artist-info-duration").contains("Duration: 8:35.");

    cy.url().should("include", "/artists/1");
  });

  it("Should redirect to home by clicking on home logo", () => {
    cy.visit("http://localhost:3000/empathy-search-engine/artists/1");

    cy.get("#app-header-text-logo").click();

    cy.url().should("include", "/");
  });
});
