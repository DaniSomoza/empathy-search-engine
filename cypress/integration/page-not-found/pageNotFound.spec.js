describe("Not Found page", () => {
  it("Should show a message if page does not exists", () => {
    cy.visit("http://localhost:3000/empathy-search-engine-no-existing-url");

    cy.get("#page-not-found-title").contains("Sorry Page not found");
  });
});
