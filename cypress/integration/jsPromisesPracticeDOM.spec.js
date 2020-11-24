'use strict';

Cypress.Commands.add('buttonClick',
  (mouseButton) => {
    cy.get('body').trigger('mousedown', mouseButton)
      .trigger('mouseup');
  });

Cypress.Commands.add('checkProm',
  (promise) => {
    cy.get('[data-qa="notification"]').contains(promise);
  });

const fPromRes = 'First promise was resolved';
const fPromRej = 'First promise was rejected';
const sPromRes = 'Second promise was resolved';
const thPromRes = 'Third promise was resolved';

describe('promises in DOM', () => {
  beforeEach('open site', () => {
    cy.visit('/');
  });

  it('should resolve first promise left click', function() {
    cy.buttonClick({ button: 0 });
    cy.checkProm(fPromRes);
    //NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.checkProm(fPromRej).should('not.exist');
  });

  it('should resolve first promise right click', function() {
    cy.buttonClick({ button: 2 });
    cy.checkProm(fPromRes);
  });

  it('should resolve first promise middle button click', function() {
    cy.buttonClick({ button: 1 });
    cy.checkProm(fPromRes);
  });

  it('should ignore middle button click for the second promise', function() {
    cy.buttonClick({ button: 1 });
    cy.buttonClick({ button: 1 });
    cy.checkProm(sPromRes).should('not.exist');
  });

  it('should reject first promise ', function() {
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.checkProm(fPromRej);
  });

  it('should resolve second promise right click', function() {
    cy.buttonClick({ button: 2 });
    cy.checkProm(sPromRes);
  });

  it('should resolve second promise left click', function() {
    cy.buttonClick({ button: 0 });
    cy.checkProm(sPromRes);
  });

  it('should resolve third promise', function() {
    cy.buttonClick({ button: 2 });
    cy.buttonClick({ button: 0 });
    cy.checkProm(thPromRes);
  });

  it('should resolve all promises', function() {
    cy.buttonClick({ button: 2 });
    cy.buttonClick({ button: 0 });
    cy.checkProm(fPromRes);
    cy.checkProm(sPromRes);
    cy.checkProm(thPromRes);
  });

  it('should reject 1st promise, resolve 2nd and 3rd promises', function() {
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.buttonClick({ button: 0 });
    cy.buttonClick({ button: 2 });
    cy.checkProm(fPromRej);
    cy.checkProm(sPromRes);
    cy.checkProm(thPromRes);
  });
});
