'use strict';

Cypress.Commands.add('clickButton', (mouseButton) =>
  cy.get('body').trigger('mousedown', mouseButton).trigger('mouseup')
);

Cypress.Commands.add('checkMessageDisplayed', (message) =>
  cy.get('[data-qa="notification"]').contains(message)
);

const firstResolvedMsg = 'First promise was resolved';
const firstRejectedMsg = 'First promise was rejected';
const secondResolvedMsg = 'Second promise was resolved';
const thirdResolvedMsg = 'Third promise was resolved';

describe('Promises in DOM', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('firstPromise', () => {
    it('should be resolved on the left click', () => {
      cy.clickButton({ button: 0 });
      cy.checkMessageDisplayed(firstResolvedMsg);

      // NOTE: waiting for reject
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(3000);
      cy.checkMessageDisplayed(firstRejectedMsg).should('not.exist');
    });

    it('should be rejected after 3 seconds of inactivity', () => {
      // NOTE: waiting for reject
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(3000);
      cy.checkMessageDisplayed(firstRejectedMsg);
      cy.checkMessageDisplayed(firstResolvedMsg).should('not.exist');
    });
  });

  describe('secondPromise', () => {
    it('should be resolved on the left click', () => {
      cy.clickButton({ button: 0 });
      cy.checkMessageDisplayed(firstResolvedMsg);
    });

    it('should be resolved on the right click', () => {
      cy.clickButton({ button: 2 });
      cy.checkMessageDisplayed(secondResolvedMsg);
    });
  });

  describe('thirdPromise', () => {
    it('should be resolved on the left and right click', () => {
      cy.clickButton({ button: 2 });
      cy.clickButton({ button: 0 });
      cy.checkMessageDisplayed(thirdResolvedMsg);
    });

    it('should not be resolved only on the left click', () => {
      cy.clickButton({ button: 0 });
      cy.checkMessageDisplayed(thirdResolvedMsg).should('not.exist');
    });

    it('should not be resolved only on the right click', () => {
      cy.clickButton({ button: 2 });
      cy.checkMessageDisplayed(thirdResolvedMsg).should('not.exist');
    });
  });
});
