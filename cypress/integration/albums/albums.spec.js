describe("Albums Page", () => {
  it("Should go to Albums Page and see details", () => {
    cy.visit("http://localhost:3000/empathy-search-engine/");

    cy.get("#category-dropdown").select("album");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const albumItemId = "#gallery-item-2";

    cy.get(albumItemId).should("be.visible");

    cy.get(albumItemId).click();

    cy.get("#album-info-name").contains("Name: Album 2.");
    cy.get("#album-info-total-tracks").contains("Tracks: 137 tracks.");

    cy.url().should("include", "/albums/2");
  });

  it("Should redirect to home by clicking on home logo", () => {
    cy.visit("http://localhost:3000/empathy-search-engine/albums/2");

    cy.get("#app-header-text-logo").click();

    cy.url().should("include", "/");
  });
});
