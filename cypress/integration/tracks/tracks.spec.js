describe("Track Page", () => {
  it("Should go to Track Page and see details", () => {
    cy.visit("http://localhost:3000/");

    cy.get("#category-dropdown").select("track");

    cy.get("#search-query-input")
      .type("test query")
      .should("have.value", "test query");

    const trackItemId = "#gallery-item-3";

    cy.get(trackItemId).should("be.visible");

    cy.get(trackItemId).click();

    cy.get("#track-info-name").contains("Name: Track 3.");
    cy.get("#track-info-duration").contains("Duration: 8:35.");

    cy.url().should("include", "/tracks/3");
  });

  it("Should redirect to home by clicking on home logo", () => {
    cy.visit("http://localhost:3000/tracks/3");

    cy.get("#app-header-text-logo").click();

    cy.url().should("include", "/");
  });
});
