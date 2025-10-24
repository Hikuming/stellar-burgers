describe('modal tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('open modal', function () {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=bun]').contains('bun1').click();
    cy.get('[data-cy=modal]').contains('bun1').should('exist');
  });

  it('close modal', function () {
    cy.get('[data-cy=bun]').contains('bun1').click();
    cy.get('[data-cy=modal]').contains('bun1').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('open modal', function () {
    cy.get('[data-cy=bun]').contains('bun1').click();
    cy.get('[data-cy=modal]').contains('bun1').should('exist');
    cy.get('[data-cy=modal-overlay]').click({force: true});
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
