import { rout } from '../../../src/constants/element-captions';

describe('routing-test', function () {
  it('app works correctly with routes', () => {
    cy.visit('http://localhost:3000');

    cy.get('a[href="/recursion"]').click().get('h3').should('have.text', 'Строка');
    cy.get(rout).should('have.text', 'К оглавлению').click();

    cy.get('a[href="/fibonacci"]').click().get('h3').should('have.text', 'Последовательность Фибоначчи');
    cy.get(rout).should('have.text', 'К оглавлению').click();

    cy.get('a[href="/sorting"]').click().get('h3').should('have.text', 'Сортировка массива');
    cy.get(rout).should('have.text', 'К оглавлению').click();

    cy.get('a[href="/stack"]').click().get('h3').should('have.text', 'Стек');
    cy.get(rout).should('have.text', 'К оглавлению').click();

    cy.get('a[href="/queue"]').click().get('h3').should('have.text', 'Очередь');
    cy.get(rout).should('have.text', 'К оглавлению').click();

    cy.get('a[href="/list"]').click().get('h3').should('have.text', 'Связный список');
    cy.get(rout).should('have.text', 'К оглавлению').click();
  });

})