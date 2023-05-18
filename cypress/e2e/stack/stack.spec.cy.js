import { circle, defaultColor, changingColor } from '../../../src/constants/element-captions';

describe('stack-test', function () {
    it('disabled button if empty input', () => {
        cy.visit('http://localhost:3000/stack').get('input[type="text"]').should('have.value', '');
        cy.get('button[type="submit"]').should('have.disabled', true)
    });
    it('adding works correctly', () => {
        cy.clock();
        cy.visit('http://localhost:3000/stack').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(500);
        cy.get(circle).should('have.length', 1);
        cy.get(circle).eq(0).should('have.css', 'border-color', changingColor).contains('1')
        cy.tick(500);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get('input[type="text"]').type('2').should('have.value', '2');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(500);
        cy.get(circle).should('have.length', 2);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', changingColor).contains('2')
        cy.tick(500);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('2')
    });
    it('removal works correctly', () => {
        cy.clock();
        cy.visit('http://localhost:3000/stack').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(1000);
        cy.get('input[type="text"]').type('2').should('have.value', '2');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(1000);
        cy.get('button[data-testid= "remove"]').click();
        cy.tick(500);
        cy.get(circle).should('have.length', 2);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', changingColor).contains('2')
        cy.tick(500);
        cy.get(circle).should('have.length', 1);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
    });
    it('clear works correctly', () => {
        cy.clock();
        cy.visit('http://localhost:3000/stack').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(1000);
        cy.get('input[type="text"]').type('2').should('have.value', '2');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(1000);
        cy.get('button[data-testid= "clear"]').click();
        cy.tick(1000);
        cy.get(circle).should('have.length', 0);
        cy.get('button[data-testid= "remove"]').should('have.disabled');
        cy.get('button[data-testid= "clear"]').should('have.disabled');
    })
})