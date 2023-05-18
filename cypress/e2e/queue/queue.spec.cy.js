import { circle_content, circle, defaultColor, changingColor } from '../../../src/constants/element-captions';

describe('queue-test', function () {
    it('disabled button if empty input', () => {
        cy.visit('http://localhost:3000/queue').get('input[type="text"]').should('have.value', '');
        cy.get('button[type="submit"]').should('have.disabled', true)
    });
    it('adding works correctly', () => {
        cy.clock();
        cy.visit('http://localhost:3000/queue').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(499);
        cy.get(circle).should('have.length', 7);
        cy.get(circle).eq(0).should('have.css', 'border-color', changingColor).contains('1')
        cy.tick(499);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle_content).eq(0).contains('head');
        cy.get(circle_content).eq(0).contains('tail');

        cy.get('input[type="text"]').type('10').should('have.value', '10');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(499);
        cy.get(circle).should('have.length', 7);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', changingColor).contains('10')
        cy.tick(499);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('10')
        cy.get(circle_content).eq(0).contains('head');
        cy.get(circle_content).eq(1).contains('tail');
    });
    it('removal works correctly', () => {
        cy.clock();
        cy.visit('http://localhost:3000/queue').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(1000);
        cy.get('input[type="text"]').type('10').should('have.value', '10');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(1000);
        cy.get('button[data-testid= "remove"]').click();
        cy.tick(499);
        cy.get(circle).should('have.length', 7);
        cy.get(circle).eq(0).should('have.css', 'border-color', changingColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('10')
        cy.get(circle_content).eq(0).contains('head');
        cy.get(circle_content).eq(1).contains('tail');
        cy.tick(499);
        cy.get(circle).should('have.length', 7);
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('10')
        cy.get(circle_content).eq(1).contains('head');
        cy.get(circle_content).eq(1).contains('tail');
    });
    it('clear works correctly', () => {
        cy.clock();
        cy.visit('http://localhost:3000/queue').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(1000);
        cy.get('input[type="text"]').type('10').should('have.value', '10');
        cy.get('button[data-testid= "add"]').click();
        cy.tick(1000);
        cy.get('button[data-testid= "clear"]').click();
        cy.tick(1000);
        cy.get(circle).should('have.length', 7);
        cy.get(circle).should('have.text', '');
        cy.get('button[data-testid= "remove"]').should('have.disabled');
        cy.get('button[data-testid= "clear"]').should('have.disabled');
    })
})