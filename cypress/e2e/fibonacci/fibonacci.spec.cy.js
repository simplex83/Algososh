import { circle, defaultColor } from '../../../src/constants/element-captions';

describe('fibonacci-test', function () {
    it('disabled button if empty input', () => {
        cy.visit('http://localhost:3000/fibonacci').get('input[type="text"]').should('have.value', '');
        cy.get('button[type="submit"]').should('have.disabled', true)
    });
    it('fibonacci works correct', () => {
        cy.clock();
        cy.visit('http://localhost:3000/fibonacci').get('input[type="text"]').type('4').should('have.value', '4');
        cy.get('button[type="submit"]').click();
        cy.tick(499);
        cy.get(circle).should('have.length', 1);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.tick(500);
        cy.get(circle).should('have.length', 2);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('1')
        cy.tick(500);
        cy.get(circle).should('have.length', 3);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(2).should('have.css', 'border-color', defaultColor).contains('2')
        cy.tick(500);
        cy.get(circle).should('have.length', 4);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(2).should('have.css', 'border-color', defaultColor).contains('2')
        cy.get(circle).eq(3).should('have.css', 'border-color', defaultColor).contains('3')
        cy.tick(500);
        cy.get(circle).should('have.length', 5);
        cy.get(circle).eq(0).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(1).should('have.css', 'border-color', defaultColor).contains('1')
        cy.get(circle).eq(2).should('have.css', 'border-color', defaultColor).contains('2')
        cy.get(circle).eq(3).should('have.css', 'border-color', defaultColor).contains('3')
        cy.get(circle).eq(4).should('have.css', 'border-color', defaultColor).contains('5')
    })
})
