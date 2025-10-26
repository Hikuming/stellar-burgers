describe('modal tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'orderSuccess.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('create order test', function () {
    cy.get('[data-cy=buns]').contains('Добавить').click();
    cy.get('[data-cy=mains]').contains('Добавить').click();
    cy.get('[data-cy=souces]').contains('Добавить').click();

    cy.get('[data-cy=bun-top]').contains('bun1').should('exist');
    cy.get('[data-cy=bun-bottom]').contains('bun1').should('exist');

    cy.get('[data-cy=bun-item]').contains('main2').should('exist');
    cy.get('[data-cy=bun-item]').contains('sauce4').should('exist');

    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=modal]').contains('666').should('exist'); //order.number: 666

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=bun-top-empty]').should('exist');
    cy.get('[data-cy=bun-bottom-empty]').should('exist');
    cy.get('[data-cy=bun-item-empty]').should('exist');
  });
});
