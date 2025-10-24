describe('ingredients tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

   it('test adding ingridients', function() {
    cy.get('[data-cy=bun]').contains('Добавить').click();
    cy.get('[data-cy=bun-top]').contains('bun1').should('exist');
    cy.get('[data-cy=bun-bottom]').contains('bun1').should('exist');
   })
});
