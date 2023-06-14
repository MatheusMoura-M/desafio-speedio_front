context("Register", () => {
  describe("My First Test", () => {
    it("Visits the Kitchen Sink", () => {
      cy.visit("https://example.cypress.io");
    });

    it("Enters the landing page and tries to go to the register page", () => {
      cy.visit("http://localhost:5173");

      cy.viewport(1440, 900);
      cy.contains("Registrar").click();
    });
  });
});
