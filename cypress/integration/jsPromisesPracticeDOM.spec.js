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

  it('should resolve first promise on the left click', () => {
    cy.clickButton({ button: 0 });
    cy.checkMessageDisplayed(firstResolvedMsg);
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.checkMessageDisplayed(firstRejectedMsg).should('not.exist');
  });

  it('should resolve first promise on the right click', () => {
    cy.clickButton({ button: 2 });
    cy.checkMessageDisplayed(firstResolvedMsg);
  });

  it('should resolve first promise on the middle button click', () => {
    cy.clickButton({ button: 1 });
    cy.checkMessageDisplayed(firstResolvedMsg);
  });

  it('should ignore middle button click for the second promise', () => {
    cy.clickButton({ button: 1 });
    cy.clickButton({ button: 1 });
    cy.checkMessageDisplayed(secondResolvedMsg).should('not.exist');
  });

  it('should reject first promise after 3 seconds of inactivity', () => {
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.checkMessageDisplayed(firstRejectedMsg);
  });

  it('should resolve second promise on the right click', () => {
    cy.clickButton({ button: 2 });
    cy.checkMessageDisplayed(secondResolvedMsg);
  });

  it('should resolve second promise on the left click', () => {
    cy.clickButton({ button: 0 });
    cy.checkMessageDisplayed(secondResolvedMsg);
  });

  it('should resolve third promise', () => {
    cy.clickButton({ button: 2 });
    cy.clickButton({ button: 0 });
    cy.checkMessageDisplayed(thirdResolvedMsg);
  });

  it('should resolve all promises', () => {
    cy.clickButton({ button: 2 });
    cy.clickButton({ button: 0 });
    cy.checkMessageDisplayed(firstResolvedMsg);
    cy.checkMessageDisplayed(secondResolvedMsg);
    cy.checkMessageDisplayed(thirdResolvedMsg);
  });

  it('should reject 1st promise, resolve 2nd and 3rd promises', () => {
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.clickButton({ button: 0 });
    cy.clickButton({ button: 2 });
    cy.checkMessageDisplayed(firstRejectedMsg);
    cy.checkMessageDisplayed(secondResolvedMsg);
    cy.checkMessageDisplayed(thirdResolvedMsg);
  });
});
