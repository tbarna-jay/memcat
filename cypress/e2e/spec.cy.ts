describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.get('h2:contains("Choose username(s)")').should("be.visible");
    cy.get('label:contains("User A:")')
      .should("be.visible")
      .click()
      .type("sdf");
    cy.get('button:contains("Play")').should("be.visible").click();
  });
});
