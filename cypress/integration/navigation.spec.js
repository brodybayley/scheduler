describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  //finds tuesday, clicks on date and checks day is selected
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
