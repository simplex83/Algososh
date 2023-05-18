import { circle, defaultColor, changingColor, modifiedColor } from '../../../src/constants/element-captions';

describe('string-test', function () {
    it('disabled button if empty input', () => {
        cy.visit('http://localhost:3000/recursion').get('input[type="text"]').should('have.value', '');
        cy.get('button[type="submit"]').should('have.disabled', true)
    });
    it('recursion works correct', () => {
        cy.visit('http://localhost:3000/recursion').get('input[type="text"]').type('qwer').should('have.value', 'qwer');
        cy.get('button[type="submit"]').click();
        cy.clock();
        cy.get(circle).should('have.length', 4);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('q')
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('w')
        cy.get(circle).eq(2).should('have.css', 'border-color', defaultColor).contains('e')
        cy.get(circle).eq(3).should('have.css', 'border-color', defaultColor).contains('r')
        cy.tick(1000);
        cy.get(circle).should('have.length', 4);
        cy.get(circle).eq(0).should('have.css', 'border-color', modifiedColor).contains('r')
        cy.get(circle).eq(1).should('have.css', 'border-color', changingColor).contains('w')
        cy.get(circle).eq(2).should('have.css', 'border-color', changingColor).contains('e')
        cy.get(circle).eq(3).should('have.css', 'border-color', modifiedColor).contains('q')
        cy.tick(1000);
        cy.get(circle).should('have.length', 4);
        cy.get(circle).eq(0).should('have.css', 'border-color', modifiedColor).contains('r')
        cy.get(circle).eq(1).should('have.css', 'border-color', modifiedColor).contains('e')
        cy.get(circle).eq(2).should('have.css', 'border-color', modifiedColor).contains('w')
        cy.get(circle).eq(3).should('have.css', 'border-color', modifiedColor).contains('q')
    });
})